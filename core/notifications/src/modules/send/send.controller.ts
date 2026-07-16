import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SendService } from './send.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { BroadcastDto } from './dto/broadcast.dto';
import { NotificationChannel } from '../../entities/notification.entity';

@Controller('send')
export class SendController {
  constructor(private readonly sendService: SendService) {}

  @Post('whatsapp')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendWhatsapp(@Body() dto: SendNotificationDto) {
    dto.channel = NotificationChannel.WHATSAPP;
    return this.sendService.queueNotification(dto);
  }

  @Post('sms')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendSms(@Body() dto: SendNotificationDto) {
    dto.channel = NotificationChannel.SMS;
    return this.sendService.queueNotification(dto);
  }

  @Post('email')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendEmail(@Body() dto: SendNotificationDto) {
    dto.channel = NotificationChannel.EMAIL;
    return this.sendService.queueNotification(dto);
  }

  @Post('broadcast')
  @HttpCode(HttpStatus.ACCEPTED)
  async broadcast(@Body() dto: BroadcastDto) {
    return this.sendService.queueBroadcast(dto);
  }
}
