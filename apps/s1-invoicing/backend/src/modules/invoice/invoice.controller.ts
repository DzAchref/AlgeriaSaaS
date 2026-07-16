import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() data: any) {
    return this.invoiceService.create(data);
  }

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.invoiceService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }

  @Post(':id/issue')
  issue(@Param('id') id: string) {
    return this.invoiceService.issue(id);
  }
}
