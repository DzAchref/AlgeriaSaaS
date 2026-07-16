import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChannelInterface } from './channel.interface';
import { NotificationEntity, NotificationStatus } from '../entities/notification.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailChannel implements ChannelInterface {
  private readonly logger = new Logger(EmailChannel.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT', 587),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async send(notification: NotificationEntity) {
    this.logger.log(`Sending Email to ${notification.recipient}`);
    try {
      /* Mocking send since real SMTP config is not provided
      const info = await this.transporter.sendMail({
        from: '"Algeria SaaS" <no-reply@algeriasaas.dz>',
        to: notification.recipient,
        subject: notification.subject || 'Notification',
        text: notification.body,
        html: `<b>${notification.body}</b><br/><div dir="rtl">${notification.bodyAr || ''}</div>`,
      });
      return { success: true, messageId: info.messageId };
      */
      return { success: true, messageId: `email_mock_${Date.now()}` };
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async getStatus(messageId: string) {
    return NotificationStatus.DELIVERED;
  }

  validateRecipient(recipient: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(recipient);
  }
}
