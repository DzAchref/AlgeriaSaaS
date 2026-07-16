import { Controller, Post, Body } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CalculatePayrollDto } from './dto/calculate-payroll.dto';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post('calculate')
  calculate(@Body() dto: CalculatePayrollDto) {
    return this.payrollService.calculate(dto);
  }
}
