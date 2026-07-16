import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../../entities/tenant.entity';
import { BusinessProfile } from '../../entities/business-profile.entity';
import { UpdateBusinessProfileDto } from './dto/update-business-profile.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
    @InjectRepository(BusinessProfile) private profileRepository: Repository<BusinessProfile>,
  ) {}

  async getTenant(id: string) {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async updateTenantName(id: string, name: string) {
    const tenant = await this.getTenant(id);
    tenant.name = name;
    return this.tenantRepository.save(tenant);
  }

  async getBusinessProfile(tenantId: string) {
    const profile = await this.profileRepository.findOne({ where: { tenantId } });
    if (!profile) throw new NotFoundException('Business profile not found');
    return profile;
  }

  async updateBusinessProfile(tenantId: string, dto: UpdateBusinessProfileDto) {
    const profile = await this.getBusinessProfile(tenantId);
    Object.assign(profile, dto);
    return this.profileRepository.save(profile);
  }
}
