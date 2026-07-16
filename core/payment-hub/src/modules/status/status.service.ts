import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async getStatus(id: string) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return {
      id: payment.id,
      status: payment.status,
      providerTransactionId: payment.providerTransactionId,
      amount: payment.amount,
      currency: payment.currency,
    };
  }
}
