import { Module } from '@nestjs/common';
import { FiscalStampController } from './fiscal-stamp.controller';
import { FiscalStampService } from './fiscal-stamp.service';

@Module({
  controllers: [FiscalStampController],
  providers: [FiscalStampService],
  exports: [FiscalStampService],
})
export class FiscalStampModule {}
