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
export class EdahabiaProvider implements PaymentProviderInterface {
  private readonly logger = new Logger(EdahabiaProvider.name);

  async createCheckout(request: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
    this.logger.log(`Creating SATIM/Edahabia checkout for ${request.amount} ${request.currency}`);
    const mockTxId = `stm_${uuidv4().replace(/-/g, '').substring(0, 24)}`;
    return {
      checkoutUrl: `https://satim.dz/payment/${mockTxId}`,
      providerTransactionId: mockTxId,
    };
  }

  async getStatus(transactionId: string): Promise<PaymentStatusResponse> {
    return {
      status: PaymentStatus.COMPLETED,
      providerTransactionId: transactionId,
      amount: 0,
      currency: 'DZD',
    };
  }

  async processRefund(transactionId: string, amount: number): Promise<boolean> {
    return true;
  }

  async processWebhook(payload: any, headers: any): Promise<{ transactionId: string; status: PaymentStatus }> {
    return {
      transactionId: payload?.orderId || 'mock_tx_id',
      status: PaymentStatus.COMPLETED,
    };
  }
}
