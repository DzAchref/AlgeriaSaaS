import { Controller, Post, Body, Headers, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { PaymentProvider } from '../../entities/payment.entity';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post(':provider')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Param('provider') provider: PaymentProvider,
    @Body() payload: any,
    @Headers() headers: any,
  ) {
    await this.webhookService.processWebhook(provider, payload, headers);
    return { success: true };
  }
}
