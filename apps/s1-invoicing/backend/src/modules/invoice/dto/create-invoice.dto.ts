import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsDateString,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceType } from '../../../entities/invoice.entity';

export class CreateInvoiceLineDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descriptionAr?: string;

  @IsNumber()
  @Min(0.001)
  quantity!: number;

  @IsNumber()
  @Min(0)
  unitPrice!: number;

  /** TVA rate as decimal: 0.19 (19%), 0.09 (9%), or 0 (exempt) */
  @IsNumber()
  @Min(0)
  @Max(1)
  tvaRate!: number;
}

export class InlineClientDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  nameAr?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  nif?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  rc?: string;

  @IsOptional()
  address?: {
    street: string;
    streetAr?: string;
    city: string;
    cityAr?: string;
    wilaya: string;
    wilayaAr?: string;
    postalCode: string;
    country: string;
  };

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}

export class CreateInvoiceDto {
  @IsOptional()
  @IsUUID()
  tenantId?: string;

  /** Provide either clientId (existing) or clientData (inline) */
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => InlineClientDto)
  clientData?: InlineClientDto;

  @IsEnum(InvoiceType)
  @IsOptional()
  type?: InvoiceType;

  @IsDateString()
  @IsOptional()
  issueDate?: string;

  @IsDateString()
  dueDate!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notesAr?: string;

  @IsOptional()
  @IsString()
  locale?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceLineDto)
  lineItems!: CreateInvoiceLineDto[];
}
