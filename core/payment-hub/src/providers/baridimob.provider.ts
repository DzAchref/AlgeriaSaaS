import { Injectable, Logger } from '@common';
import { 
  PaymentProviderInterface, 
  CreateCheckoutRequest, 
  CreateCheckoutResponse, 
  PaymentStatusResponse 
} from './payment-provider.interface';
import { PaymentStatus } from '../entities/payment.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BaridiMobProvider implements PaymentProviderInterface {
  private readonly logger = new Logger(BaridiMobProvider.name);

  async createCheckout(request: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
    this.logger.log(`Creating BaridiMob QR for ${request.amount} ${request.currency}`);
    const mockTxId = `bm_${uuidv4().replace(/-/g, '').substring(0, 24)}`;
    // Returns a deep link or QR code representation
    return {
      checkoutUrl: `baridimob://pay?amount=${request.amount}&id=${mockTxId}`,
      providerTransactionId: mockTxId,
    };
  }

  async getStatus(transactionId: string): Promise<PaymentStatusResponse> {
    return {
      status: PaymentStatus.PENDING,
      providerTransactionId: transactionId,
      amount: 0,
      currency: 'DZD',
    };
  }

  async processRefund(transactionId: string, amount: number): Promise<boolean> {
    return false; // Typically hard to refund BaridiMob programmatically
  }

  async processWebhook(payload: any, headers: any): Promise<{ transactionId: string; status: PaymentStatus }> {
    return {
      transactionId: payload?.id || 'mock_tx_id',
      status: PaymentStatus.COMPLETED,
    };
  }
}
