import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export interface ClientAddress {
  street: string;
  streetAr?: string;
  city: string;
  cityAr?: string;
  wilaya: string;
  wilayaAr?: string;
  postalCode: string;
  country: string;
}

@Entity('clients')
@Index(['tenantId', 'nif'], { unique: true, where: '"nif" IS NOT NULL' })
@Index(['tenantId', 'name'])
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  @Index()
  tenantId!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nameAr!: string | null;

  /** Numéro d'Identification Fiscale */
  @Column({ type: 'varchar', length: 50, nullable: true })
  nif!: string | null;

  /** Registre de Commerce */
  @Column({ type: 'varchar', length: 50, nullable: true })
  rc!: string | null;

  /** Numéro d'Identification Statistique */
  @Column({ type: 'varchar', length: 50, nullable: true })
  nis!: string | null;

  /** Article d'Imposition */
  @Column({ type: 'varchar', length: 50, nullable: true })
  ai!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  address!: ClientAddress | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
