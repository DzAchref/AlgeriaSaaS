import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { SendController } from './send.controller';
import { SendService } from './send.service';
import { NotificationEntity } from '../../entities/notification.entity';
import { NotificationProcessor } from '../../processors/notification.processor';
import { WhatsappChannel } from '../../channels/whatsapp.channel';
import { SmsChannel } from '../../channels/sms.channel';
import { EmailChannel } from '../../channels/email.channel';
import { TemplateEntity } from '../../entities/template.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity, TemplateEntity]),
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  controllers: [SendController],
  providers: [SendService, NotificationProcessor, WhatsappChannel, SmsChannel, EmailChannel],
  exports: [SendService],
})
export class SendModule {}
