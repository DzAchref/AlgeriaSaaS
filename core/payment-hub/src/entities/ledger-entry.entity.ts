import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum AccountType {
  ASSET = 'asset',
  LIABILITY = 'liability',
  REVENUE = 'revenue',
  EXPENSE = 'expense',
}

@Entity('ledger_entries', { schema: 'payment' })
export class LedgerEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  paymentId: string;

  @Column({ type: 'uuid' })
  tenantId: string;

  @Column({ type: 'enum', enum: AccountType })
  accountType: AccountType;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  debitAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  creditAmount: number;

  @Column({ type: 'varchar' })
  currency: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
