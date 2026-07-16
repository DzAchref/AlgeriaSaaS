import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { NotificationEntity } from './entities/notification.entity';
import { TemplateEntity } from './entities/template.entity';
import { SendModule } from './modules/send/send.module';
import { TemplateModule } from './modules/template/template.module';

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
        entities: [NotificationEntity, TemplateEntity],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: configService.get('REDIS_URL'),
      }),
    }),
    SendModule,
    TemplateModule,
  ],
})
export class AppModule {}
