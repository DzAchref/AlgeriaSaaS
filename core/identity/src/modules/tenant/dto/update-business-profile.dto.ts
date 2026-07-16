import { IsString, IsOptional, IsEnum, IsNumber, IsObject } from 'class-validator';
import { AlgerianLegalForm } from '../../../entities/business-profile.entity';

export class UpdateBusinessProfileDto {
  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  companyNameAr?: string;

  @IsString()
  @IsOptional()
  rc?: string;

  @IsString()
  @IsOptional()
  nif?: string;

  @IsString()
  @IsOptional()
  nis?: string;

  @IsString()
  @IsOptional()
  ai?: string;

  @IsNumber()
  @IsOptional()
  capitalSocial?: number;

  @IsEnum(AlgerianLegalForm)
  @IsOptional()
  legalForm?: AlgerianLegalForm;

  @IsObject()
  @IsOptional()
  address?: Record<string, any>;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
