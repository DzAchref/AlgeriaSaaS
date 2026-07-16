import { Module } from '@nestjs/common';
import { EInvoicingController } from './e-invoicing.controller';
import { EInvoicingService } from './e-invoicing.service';

@Module({
  controllers: [EInvoicingController],
  providers: [EInvoicingService],
  exports: [EInvoicingService],
})
export class EInvoicingModule {}
