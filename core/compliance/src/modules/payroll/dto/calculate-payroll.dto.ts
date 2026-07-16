import { IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class CalculatePayrollDto {
  @IsNumber()
  @Min(0)
  grossSalary: number;

  @IsBoolean()
  @IsOptional()
  hasAsnap?: boolean;

  @IsNumber()
  @Min(0)
  @IsOptional()
  dependents?: number;
}
