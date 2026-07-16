import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { InvoiceRulesService } from './invoice-rules.service';
import { ValidateInvoiceDto } from './dto/validate-invoice.dto';

@Controller('invoice-rules')
export class InvoiceRulesController {
  constructor(private readonly rulesService: InvoiceRulesService) {}

  @Post('validate')
  validate(@Body() dto: ValidateInvoiceDto) {
    return this.rulesService.validateMandatoryFields(dto);
  }

  @Get('next-number/:tenantId')
  getNextNumber(@Param('tenantId') tenantId: string) {
    return this.rulesService.generateNextInvoiceNumber(tenantId);
  }
}
