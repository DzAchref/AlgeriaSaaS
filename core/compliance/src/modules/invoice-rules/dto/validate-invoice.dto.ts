import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ValidateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  rc: string;

  @IsString()
  @IsNotEmpty()
  nif: string;

  @IsString()
  @IsNotEmpty()
  nis: string;

  @IsString()
  @IsNotEmpty()
  ai: string;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsOptional()
  clientRc?: string;

  @IsString()
  @IsOptional()
  clientNif?: string;

  @IsString()
  @IsOptional()
  clientNis?: string;

  @IsString()
  @IsOptional()
  clientAi?: string;
}
