import { Module } from '@nestjs/common';
import { AnpdpController } from './anpdp.controller';
import { AnpdpService } from './anpdp.service';

@Module({
  controllers: [AnpdpController],
  providers: [AnpdpService],
  exports: [AnpdpService],
})
export class AnpdpModule {}
