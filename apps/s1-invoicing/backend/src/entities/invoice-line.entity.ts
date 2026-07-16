import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity('invoice_lines')
@Index(['invoiceId', 'sortOrder'])
export class InvoiceLine {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  invoiceId!: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.lines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoiceId' })
  invoice!: Invoice;

  @Column({ type: 'varchar', length: 500 })
  description!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  descriptionAr!: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 3, default: 1 })
  quantity!: number;

  /** Unit price in DZD (Hors Taxe) */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  unitPrice!: number;

  /** TVA rate: 0.19 for standard (19%), 0.09 for reduced (9%), 0 for exempt */
  @Column({ type: 'decimal', precision: 5, scale: 4, default: 0.19 })
  tvaRate!: number;

  /** Calculated TVA amount for this line = totalHT * tvaRate */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  tvaAmount!: number;

  /** Line total before tax = quantity * unitPrice */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalHT!: number;

  /** Line total including tax = totalHT + tvaAmount */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalTTC!: number;

  @Column({ type: 'int', default: 0 })
  sortOrder!: number;
}
