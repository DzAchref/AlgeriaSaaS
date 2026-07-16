import { NotificationEntity, NotificationStatus } from '../entities/notification.entity';

export interface ChannelInterface {
  send(notification: NotificationEntity): Promise<{ success: boolean; messageId?: string; error?: string }>;
  getStatus(messageId: string): Promise<NotificationStatus>;
  validateRecipient(recipient: string): boolean;
}
