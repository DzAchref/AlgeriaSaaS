import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { NotificationEntity, NotificationChannel } from '../../entities/notification.entity';
import { SendNotificationDto } from './dto/send-notification.dto';
import { BroadcastDto } from './dto/broadcast.dto';

@Injectable()
export class SendService {
  private readonly logger = new Logger(SendService.name);

  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
    @InjectQueue('notifications') private notificationsQueue: Queue,
  ) {}

  async queueNotification(dto: SendNotificationDto) {
    // Smart routing logic (e.g. if SMS, maybe prefer WhatsApp if cheaper)
    // For now, respect the requested channel

    const notification = this.notificationRepository.create({
      tenantId: dto.tenantId,
      channel: dto.channel,
      recipient: dto.recipient,
      subject: dto.subject,
      body: dto.body,
      bodyAr: dto.bodyAr,
      templateId: dto.templateId,
      metadata: dto.metadata,
    });
    
    await this.notificationRepository.save(notification);

    await this.notificationsQueue.add('send', {
      notificationId: notification.id,
      variables: dto.variables,
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
    });

    return { success: true, notificationId: notification.id };
  }

  async queueBroadcast(dto: BroadcastDto) {
    const notifications = dto.recipients.map(recipient => 
      this.notificationRepository.create({
        tenantId: dto.tenantId,
        channel: dto.channel,
        recipient: recipient,
        templateId: dto.templateId,
      })
    );

    await this.notificationRepository.save(notifications);

    const jobs = notifications.map(notif => ({
      name: 'send',
      data: { notificationId: notif.id, variables: dto.variables },
      opts: { attempts: 3, backoff: { type: 'exponential', delay: 1000 } }
    }));

    await this.notificationsQueue.addBulk(jobs);

    return { success: true, count: notifications.length };
  }
}
