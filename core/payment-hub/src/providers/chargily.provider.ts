import { Injectable, Logger } from '@common';
import { ConfigService } from '@nestjs/config';
import { 
  PaymentProviderInterface, 
  CreateCheckoutRequest, 
  CreateCheckoutResponse, 
  PaymentStatusResponse 
} from './payment-provider.interface';
import { PaymentStatus } from '../entities/payment.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChargilyProvider implements PaymentProviderInterface {
  private readonly logger = new Logger(ChargilyProvider.name);
  private readonly apiKey: string;
  private readonly secretKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('CHARGILY_API_KEY', '');
    this.secretKey = this.configService.get<string>('CHARGILY_SECRET_KEY', '');
  }

  async createCheckout(request: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
    this.logger.log(`Creating Chargily checkout for ${request.amount} ${request.currency}`);
    // Mock implementation for HTTP call to Chargily Pay v2 API
    const mockTxId = `chrg_${uuidv4().replace(/-/g, '').substring(0, 24)}`;
    return {
      checkoutUrl: `https://pay.chargily.net/test/checkout/${mockTxId}`,
      providerTransactionId: mockTxId,
    };
  }

  async getStatus(transactionId: string): Promise<PaymentStatusResponse> {
    this.logger.log(`Getting status from Chargily for tx ${transactionId}`);
    return {
      status: PaymentStatus.COMPLETED,
      providerTransactionId: transactionId,
      amount: 0, // In real life, fetch from provider
      currency: 'DZD',
    };
  }

  async processRefund(transactionId: string, amount: number): Promise<boolean> {
    this.logger.log(`Processing Chargily refund for tx ${transactionId}`);
    return true;
  }

  async processWebhook(payload: any, headers: any): Promise<{ transactionId: string; status: PaymentStatus }> {
    this.logger.log(`Processing Chargily webhook`);
    // Signature verification logic here
    return {
      transactionId: payload?.data?.id || 'mock_tx_id',
      status: payload?.data?.status === 'paid' ? PaymentStatus.COMPLETED : PaymentStatus.FAILED,
    };
  }
}
