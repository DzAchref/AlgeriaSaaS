import { IsNumber, IsString, IsEnum, IsOptional, IsUrl, Min, IsUUID, IsObject } from 'class-validator';
import { PaymentProvider } from '../../entities/payment.entity';

export class CreateCheckoutDto {
  @IsNumber()
  @Min(10)
  amount: number;

  @IsString()
  currency: string = 'DZD';

  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  tenantId: string;

  @IsUrl()
  @IsOptional()
  callbackUrl?: string;

  @IsUrl()
  @IsOptional()
  webhookUrl?: string;

  @IsString()
  @IsOptional()
  idempotencyKey?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
