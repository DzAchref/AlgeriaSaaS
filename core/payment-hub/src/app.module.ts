import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { LedgerEntry } from './entities/ledger-entry.entity';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { StatusModule } from './modules/status/status.module';
import { RefundModule } from './modules/refund/refund.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [Payment, LedgerEntry],
        synchronize: process.env.NODE_ENV !== 'production', // Use migrations in prod
      }),
    }),
    CheckoutModule,
    WebhookModule,
    StatusModule,
    RefundModule,
  ],
})
export class AppModule {}
