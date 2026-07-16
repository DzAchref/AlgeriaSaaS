import { PaymentStatus } from '../entities/payment.entity';

export interface CreateCheckoutRequest {
  amount: number;
  currency: string;
  description?: string;
  tenantId: string;
  callbackUrl?: string;
  webhookUrl?: string;
  metadata?: Record<string, any>;
}

export interface CreateCheckoutResponse {
  checkoutUrl: string;
  providerTransactionId: string;
}

export interface PaymentStatusResponse {
  status: PaymentStatus;
  providerTransactionId: string;
  amount: number;
  currency: string;
}

export interface PaymentProviderInterface {
  createCheckout(request: CreateCheckoutRequest): Promise<CreateCheckoutResponse>;
  getStatus(transactionId: string): Promise<PaymentStatusResponse>;
  processRefund(transactionId: string, amount: number): Promise<boolean>;
  processWebhook(payload: any, headers: any): Promise<{ transactionId: string; status: PaymentStatus }>;
}
