import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { Tenant } from '../../entities/tenant.entity';
import { BusinessProfile } from '../../entities/business-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, BusinessProfile])],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
