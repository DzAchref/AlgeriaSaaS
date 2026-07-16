import { IsEnum, IsArray, IsUUID, IsObject, IsOptional } from 'class-validator';
import { NotificationChannel } from '../../../entities/notification.entity';

export class BroadcastDto {
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsArray()
  recipients: string[];

  @IsUUID()
  templateId: string;

  @IsObject()
  @IsOptional()
  variables?: Record<string, any>;

  @IsUUID()
  tenantId: string;
}
