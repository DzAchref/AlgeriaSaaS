import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { NotificationChannel } from './notification.entity';

@Entity('templates', { schema: 'notification' })
export class TemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  tenantId: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: NotificationChannel })
  channel: NotificationChannel;

  @Column({ type: 'varchar', nullable: true })
  subjectFr: string;

  @Column({ type: 'varchar', nullable: true })
  subjectAr: string;

  @Column({ type: 'text' })
  bodyFr: string;

  @Column({ type: 'text', nullable: true })
  bodyAr: string;

  @Column({ type: 'jsonb', nullable: true })
  variables: string[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
