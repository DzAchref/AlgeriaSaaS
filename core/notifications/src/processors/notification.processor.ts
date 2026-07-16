import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity, NotificationStatus, NotificationChannel } from '../entities/notification.entity';
import { TemplateEntity } from '../entities/template.entity';
import { WhatsappChannel } from '../channels/whatsapp.channel';
import { SmsChannel } from '../channels/sms.channel';
import { EmailChannel } from '../channels/email.channel';

@Processor('notifications')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(
    @InjectRepository(NotificationEntity) private notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(TemplateEntity) private templateRepository: Repository<TemplateEntity>,
    private whatsappChannel: WhatsappChannel,
    private smsChannel: SmsChannel,
    private emailChannel: EmailChannel,
  ) {}

  @Process('send')
  async handleSend(job: Job<{ notificationId: string; variables?: Record<string, any> }>) {
    const { notificationId, variables } = job.data;
    const notification = await this.notificationRepository.findOne({ where: { id: notificationId } });
    
    if (!notification) {
      this.logger.error(`Notification ${notificationId} not found`);
      return;
    }

    notification.attempts += 1;
    notification.lastAttemptAt = new Date();
    await this.notificationRepository.save(notification);

    try {
      // Process Template
      if (notification.templateId) {
        const template = await this.templateRepository.findOne({ where: { id: notification.templateId } });
        if (template) {
          notification.subject = this.replaceVariables(template.subjectFr || '', variables);
          notification.body = this.replaceVariables(template.bodyFr || '', variables);
          notification.bodyAr = this.replaceVariables(template.bodyAr || '', variables);
        }
      }

      // Send via Channel
      let channelSvc;
      switch (notification.channel) {
        case NotificationChannel.WHATSAPP:
          channelSvc = this.whatsappChannel;
          break;
        case NotificationChannel.SMS:
          channelSvc = this.smsChannel;
          break;
        case NotificationChannel.EMAIL:
          channelSvc = this.emailChannel;
          break;
        default:
          throw new Error(`Unsupported channel ${notification.channel}`);
      }

      if (!channelSvc.validateRecipient(notification.recipient)) {
        throw new Error(`Invalid recipient format for channel ${notification.channel}`);
      }

      const result = await channelSvc.send(notification);
      
      if (result.success) {
        notification.status = NotificationStatus.SENT;
        notification.providerMessageId = result.messageId;
        await this.notificationRepository.save(notification);
        this.logger.log(`Notification ${notification.id} sent successfully`);
      } else {
        throw new Error(result.error || 'Failed to send notification');
      }

    } catch (error) {
      this.logger.error(`Failed to process notification ${notification.id}: ${error.message}`);
      if (notification.attempts >= 3) {
        notification.status = NotificationStatus.FAILED;
      }
      await this.notificationRepository.save(notification);
      throw error; // Let Bull retry if attempts < max
    }
  }

  private replaceVariables(text: string, variables?: Record<string, any>): string {
    if (!text || !variables) return text;
    let result = text;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    }
    return result;
  }
}
