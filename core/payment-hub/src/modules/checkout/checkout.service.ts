import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentProvider } from '../../entities/payment.entity';
import { LedgerEntry, AccountType } from '../../entities/ledger-entry.entity';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { ChargilyProvider } from '../../providers/chargily.provider';
import { EdahabiaProvider } from '../../providers/edahabia.provider';
import { BaridiMobProvider } from '../../providers/baridimob.provider';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);
  private redisClient: Redis;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(LedgerEntry)
    private ledgerRepository: Repository<LedgerEntry>,
    private chargilyProvider: ChargilyProvider,
    private edahabiaProvider: EdahabiaProvider,
    private baridimobProvider: BaridiMobProvider,
    private configService: ConfigService,
  ) {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    if (redisUrl) {
      this.redisClient = new Redis(redisUrl);
    }
  }

  async createCheckout(dto: CreateCheckoutDto) {
    // 1. Check idempotency
    if (dto.idempotencyKey && this.redisClient) {
      const existingTx = await this.redisClient.get(`idempotency:checkout:${dto.idempotencyKey}`);
      if (existingTx) {
        return JSON.parse(existingTx);
      }
    }

    // 2. Select Provider
    let providerSvc;
    switch (dto.provider) {
      case PaymentProvider.CHARGILY:
        providerSvc = this.chargilyProvider;
        break;
      case PaymentProvider.SATIM:
      case PaymentProvider.EDAHABIA:
        providerSvc = this.edahabiaProvider;
        break;
      case PaymentProvider.BARIDIMOB:
        providerSvc = this.baridimobProvider;
        break;
      default:
        throw new BadRequestException('Unsupported payment provider');
    }

    // 3. Create initial payment record
    const payment = this.paymentRepository.create({
      tenantId: dto.tenantId,
      amount: dto.amount,
      currency: dto.currency,
      provider: dto.provider,
      description: dto.description,
      metadata: dto.metadata,
      idempotencyKey: dto.idempotencyKey,
    });
    await this.paymentRepository.save(payment);

    // 4. Call provider
    const result = await providerSvc.createCheckout({
      amount: dto.amount,
      currency: dto.currency,
      tenantId: dto.tenantId,
      description: dto.description,
      callbackUrl: dto.callbackUrl,
      webhookUrl: dto.webhookUrl,
      metadata: { ...dto.metadata, internalPaymentId: payment.id },
    });

    // 5. Update payment with provider tx ID
    payment.providerTransactionId = result.providerTransactionId;
    await this.paymentRepository.save(payment);

    // 6. Record Pending Ledger Entry
    const ledgerEntry = this.ledgerRepository.create({
      paymentId: payment.id,
      tenantId: payment.tenantId,
      accountType: AccountType.ASSET,
      debitAmount: payment.amount,
      currency: payment.currency,
      description: `Pending checkout ${payment.id}`,
    });
    await this.ledgerRepository.save(ledgerEntry);

    const response = {
      paymentId: payment.id,
      checkoutUrl: result.checkoutUrl,
      status: payment.status,
    };

    // Save to Redis for 24 hours if idempotent key provided
    if (dto.idempotencyKey && this.redisClient) {
      await this.redisClient.setex(
        `idempotency:checkout:${dto.idempotencyKey}`,
        86400,
        JSON.stringify(response)
      );
    }

    return response;
  }
}
