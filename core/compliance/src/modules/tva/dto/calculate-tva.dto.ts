import { IsNumber, IsIn } from 'class-validator';

export class CalculateTvaDto {
  @IsNumber()
  amountHT: number;

  @IsNumber()
  @IsIn([19, 9, 0])
  tvaRate: number;
}
