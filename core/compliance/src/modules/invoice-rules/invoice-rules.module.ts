import { Module } from '@nestjs/common';
import { InvoiceRulesController } from './invoice-rules.controller';
import { InvoiceRulesService } from './invoice-rules.service';

@Module({
  controllers: [InvoiceRulesController],
  providers: [InvoiceRulesService],
  exports: [InvoiceRulesService],
})
export class InvoiceRulesModule {}
