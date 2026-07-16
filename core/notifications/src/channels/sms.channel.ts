import { Injectable, Logger } from '@nestjs/common';
import { ChannelInterface } from './channel.interface';
import { NotificationEntity, NotificationStatus } from '../entities/notification.entity';
import { validateAlgerianPhone, normalizePhone } from '@algeria-saas/shared';

@Injectable()
export class SmsChannel implements ChannelInterface {
  private readonly logger = new Logger(SmsChannel.name);

  async send(notification: NotificationEntity) {
    const formattedPhone = normalizePhone(notification.recipient);
    this.logger.log(`Sending SMS to ${formattedPhone} (Cost: €0.08)`);
    // Mock HTTP call to SMS aggregator for Mobilis/Djezzy/Ooredoo
    return { success: true, messageId: `sms_mock_${Date.now()}` };
  }

  async getStatus(messageId: string) {
    return NotificationStatus.DELIVERED;
  }

  validateRecipient(recipient: string) {
    return validateAlgerianPhone(recipient);
  }
}
