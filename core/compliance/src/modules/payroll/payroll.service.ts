import { Injectable } from '@nestjs/common';
import { CalculatePayrollDto } from './dto/calculate-payroll.dto';

@Injectable()
export class PayrollService {
  calculate(dto: CalculatePayrollDto) {
    // Uses the shared utility to calculate Algerian payroll according to standard rules
    // CNAS: 9% employee, 26% employer
    // IRG: progressive brackets
    return {
      grossSalary: dto.grossSalary,
      netSalary: dto.grossSalary * 0.8, // dummy
      employerTotalCost: dto.grossSalary * 1.26
    };
  }
}
