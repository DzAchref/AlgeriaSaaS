import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentProvider, PaymentStatus } from '../../entities/payment.entity';
import { LedgerEntry, AccountType } from '../../entities/ledger-entry.entity';
import { ChargilyProvider } from '../../providers/chargily.provider';
import { EdahabiaProvider } from '../../providers/edahabia.provider';
import { BaridiMobProvider } from '../../providers/baridimob.provider';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(LedgerEntry)
    private ledgerRepository: Repository<LedgerEntry>,
    private chargilyProvider: ChargilyProvider,
    private edahabiaProvider: EdahabiaProvider,
    private baridimobProvider: BaridiMobProvider,
  ) {}

  async processWebhook(provider: PaymentProvider, payload: any, headers: any) {
    let providerSvc;
    switch (provider) {
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

    const { transactionId, status } = await providerSvc.processWebhook(payload, headers);
    
    // Check if it's the internal ID or provider ID
    const payment = await this.paymentRepository.findOne({
      where: [
        { id: transactionId },
        { providerTransactionId: transactionId }
      ]
    });

    if (!payment) {
      this.logger.error(`Payment not found for webhook transaction ${transactionId}`);
      throw new NotFoundException('Payment not found');
    }

    if (payment.status === status) {
      return; // Already processed
    }

    payment.status = status;
    await this.paymentRepository.save(payment);

    // Record ledger if completed or failed
    if (status === PaymentStatus.COMPLETED) {
      const ledgerEntry = this.ledgerRepository.create({
        paymentId: payment.id,
        tenantId: payment.tenantId,
        accountType: AccountType.REVENUE,
        debitAmount: 0,
        creditAmount: payment.amount,
        currency: payment.currency,
        description: `Payment ${payment.id} completed via ${provider}`,
      });
      await this.ledgerRepository.save(ledgerEntry);
    } else if (status === PaymentStatus.FAILED) {
      const ledgerEntry = this.ledgerRepository.create({
        paymentId: payment.id,
        tenantId: payment.tenantId,
        accountType: AccountType.ASSET,
        debitAmount: 0,
        creditAmount: payment.amount,
        currency: payment.currency,
        description: `Payment ${payment.id} failed/reversed`,
      });
      await this.ledgerRepository.save(ledgerEntry);
    }
  }
}
