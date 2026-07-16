import { IsString, IsEnum, IsOptional, IsUUID, IsObject, ValidateIf } from 'class-validator';
import { NotificationChannel } from '../../../entities/notification.entity';

export class SendNotificationDto {
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsString()
  recipient: string;

  @IsUUID()
  @IsOptional()
  templateId?: string;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @ValidateIf(o => !o.templateId)
  body?: string;

  @IsString()
  @IsOptional()
  bodyAr?: string;

  @IsObject()
  @IsOptional()
  variables?: Record<string, any>;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @IsUUID()
  tenantId: string;
}
