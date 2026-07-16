import { Controller, Post, Body } from '@nestjs/common';
import { FiscalStampService } from './fiscal-stamp.service';

@Controller('fiscal-stamp')
export class FiscalStampController {
  constructor(private readonly stampService: FiscalStampService) {}

  @Post('calculate')
  calculate(@Body('paymentType') paymentType: string, @Body('amountTTC') amountTTC: number) {
    return this.stampService.calculate(paymentType, amountTTC);
  }
}
