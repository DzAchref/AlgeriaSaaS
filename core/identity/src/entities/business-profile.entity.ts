import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AlgerianLegalForm {
  AUTO_ENTREPRENEUR = 'AUTO_ENTREPRENEUR',
  EURL = 'EURL',
  SARL = 'SARL',
  SPA = 'SPA',
  SNC = 'SNC',
  GIE = 'GIE',
  ASSOCIATION = 'ASSOCIATION',
}

@Entity('business_profiles', { schema: 'identity' })
export class BusinessProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  tenantId: string;

  @Column({ type: 'varchar' })
  companyName: string;

  @Column({ type: 'varchar', nullable: true })
  companyNameAr: string;

  @Column({ type: 'varchar', nullable: true })
  rc: string; // Registre de Commerce

  @Column({ type: 'varchar', nullable: true })
  nif: string; // Numéro d'Identification Fiscale

  @Column({ type: 'varchar', nullable: true })
  nis: string; // Numéro d'Identification Statistique

  @Column({ type: 'varchar', nullable: true })
  ai: string; // Article d'Imposition

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  capitalSocial: number;

  @Column({ type: 'enum', enum: AlgerianLegalForm, default: AlgerianLegalForm.SARL })
  legalForm: AlgerianLegalForm;

  @Column({ type: 'jsonb', nullable: true })
  address: Record<string, any>;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  rcDocumentUrl: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
