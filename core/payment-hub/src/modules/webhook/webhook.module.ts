import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { Payment } from '../../entities/payment.entity';
import { LedgerEntry } from '../../entities/ledger-entry.entity';
import { ChargilyProvider } from '../../providers/chargily.provider';
import { EdahabiaProvider } from '../../providers/edahabia.provider';
import { BaridiMobProvider } from '../../providers/baridimob.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, LedgerEntry])],
  controllers: [WebhookController],
  providers: [WebhookService, ChargilyProvider, EdahabiaProvider, BaridiMobProvider],
  exports: [WebhookService],
})
export class WebhookModule {}
