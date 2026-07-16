import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { SupportedLocale } from '../../../entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  companyName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(SupportedLocale)
  @IsOptional()
  locale?: SupportedLocale;
}
