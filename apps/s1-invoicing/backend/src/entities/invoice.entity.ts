import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { InvoiceLine } from './invoice-line.entity';

export enum InvoiceStatus {
  DRAFT = 'draft',
  ISSUED = 'issued',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

export enum InvoiceType {
  STANDARD = 'standard',
  PROFORMA = 'proforma',
  CREDIT_NOTE = 'credit_note',
}

@Entity('invoices', { schema: 'invoicing' })
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  tenantId: string;

  @Column({ type: 'varchar', unique: true })
  invoiceNumber: string;

  @Column({ type: 'uuid' })
  clientId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amountHT: number;

  @Column('decimal', { precision: 10, scale: 2 })
  tvaAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  stampAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amountTTC: number;

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.DRAFT })
  status: InvoiceStatus;

  @Column({ type: 'jsonb' })
  lineItems: any[];

  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => InvoiceLine, (line) => line.invoice, { cascade: true })
  lines: InvoiceLine[];

  @Column({ type: 'enum', enum: InvoiceType, default: InvoiceType.STANDARD })
  type: InvoiceType;
}
