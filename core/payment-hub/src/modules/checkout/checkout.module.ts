import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { Payment } from '../../entities/payment.entity';
import { LedgerEntry } from '../../entities/ledger-entry.entity';
import { ChargilyProvider } from '../../providers/chargily.provider';
import { EdahabiaProvider } from '../../providers/edahabia.provider';
import { BaridiMobProvider } from '../../providers/baridimob.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, LedgerEntry])],
  controllers: [CheckoutController],
  providers: [CheckoutService, ChargilyProvider, EdahabiaProvider, BaridiMobProvider],
  exports: [CheckoutService],
})
export class CheckoutModule {}
