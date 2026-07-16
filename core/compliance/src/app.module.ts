import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TvaModule } from './modules/tva/tva.module';
import { FiscalStampModule } from './modules/fiscal-stamp/fiscal-stamp.module';
import { InvoiceRulesModule } from './modules/invoice-rules/invoice-rules.module';
import { EInvoicingModule } from './modules/e-invoicing/e-invoicing.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { AnpdpModule } from './modules/anpdp/anpdp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    TvaModule,
    FiscalStampModule,
    InvoiceRulesModule,
    EInvoicingModule,
    PayrollModule,
    AnpdpModule,
  ],
})
export class AppModule {}
