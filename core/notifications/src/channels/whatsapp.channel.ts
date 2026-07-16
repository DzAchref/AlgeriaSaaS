import { Injectable, Logger } from '@nestjs/common';
import { ChannelInterface } from './channel.interface';
import { NotificationEntity, NotificationStatus } from '../entities/notification.entity';
import { validateAlgerianPhone, normalizePhone } from '@algeria-saas/shared';

@Injectable()
export class WhatsappChannel implements ChannelInterface {
  private readonly logger = new Logger(WhatsappChannel.name);

  async send(notification: NotificationEntity) {
    const formattedPhone = normalizePhone(notification.recipient);
    this.logger.log(`Sending WhatsApp via BSP to ${formattedPhone}`);
    // Mock HTTP call to WhatsApp BSP (e.g. 360dialog)
    return { success: true, messageId: `wa_mock_${Date.now()}` };
  }

  async getStatus(messageId: string) {
    return NotificationStatus.DELIVERED;
  }

  validateRecipient(recipient: string) {
    return validateAlgerianPhone(recipient);
  }
}
