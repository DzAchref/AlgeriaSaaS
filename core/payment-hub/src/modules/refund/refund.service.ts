import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus, PaymentProvider } from '../../entities/payment.entity';
import { LedgerEntry, AccountType } from '../../entities/ledger-entry.entity';
import { ChargilyProvider } from '../../providers/chargily.provider';
import { EdahabiaProvider } from '../../providers/edahabia.provider';
import { BaridiMobProvider } from '../../providers/baridimob.provider';

@Injectable()
export class RefundService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(LedgerEntry)
    private ledgerRepository: Repository<LedgerEntry>,
    private chargilyProvider: ChargilyProvider,
    private edahabiaProvider: EdahabiaProvider,
    private baridimobProvider: BaridiMobProvider,
  ) {}

  async processRefund(id: string, refundAmount?: number) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) throw new NotFoundException('Payment not found');
    if (payment.status !== PaymentStatus.COMPLETED) throw new BadRequestException('Only completed payments can be refunded');

    const amount = refundAmount || payment.amount;

    let providerSvc;
    switch (payment.provider) {
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
        throw new BadRequestException('Refund not supported for this provider');
    }

    const success = await providerSvc.processRefund(payment.providerTransactionId, amount);

    if (success) {
      payment.status = PaymentStatus.REFUNDED;
      await this.paymentRepository.save(payment);

      const ledgerEntry = this.ledgerRepository.create({
        paymentId: payment.id,
        tenantId: payment.tenantId,
        accountType: AccountType.LIABILITY,
        debitAmount: amount,
        creditAmount: 0,
        currency: payment.currency,
        description: `Refund for payment ${payment.id}`,
      });
      await this.ledgerRepository.save(ledgerEntry);
    }

    return { success, paymentId: id, status: payment.status };
  }
}
