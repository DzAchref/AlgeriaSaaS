import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  GERANT = 'gerant',
  COMPTABLE = 'comptable',
  CAISSIER = 'caissier',
  EMPLOYE = 'employe',
  ADMIN = 'admin',
}

export enum SupportedLocale {
  FR = 'fr-DZ',
  AR = 'ar-DZ',
}

@Entity('users', { schema: 'identity' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  tenantId: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  firstNameAr: string;

  @Column({ type: 'varchar', nullable: true })
  lastNameAr: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYE })
  role: UserRole;

  @Column({ type: 'enum', enum: SupportedLocale, default: SupportedLocale.FR })
  locale: SupportedLocale;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
