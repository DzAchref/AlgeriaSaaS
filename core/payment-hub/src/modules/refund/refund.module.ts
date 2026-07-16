import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundController } from './refund.controller';
import { RefundService } from './refund.service';
import { Payment } from '../../entities/payment.entity';
import { LedgerEntry } from '../../entities/ledger-entry.entity';
import { ChargilyProvider } from '../../providers/chargily.provider';
import { EdahabiaProvider } from '../../providers/edahabia.provider';
import { BaridiMobProvider } from '../../providers/baridimob.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, LedgerEntry])],
  controllers: [RefundController],
  providers: [RefundService, ChargilyProvider, EdahabiaProvider, BaridiMobProvider],
  exports: [RefundService],
})
export class RefundModule {}
