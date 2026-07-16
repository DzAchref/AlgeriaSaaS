import { Controller, Get, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { UpdateBusinessProfileDto } from './dto/update-business-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tenants')
@UseGuards(JwtAuthGuard)
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get(':id')
  async getTenant(@Param('id') id: string) {
    return this.tenantService.getTenant(id);
  }

  @Put(':id')
  async updateTenant(@Param('id') id: string, @Body('name') name: string) {
    return this.tenantService.updateTenantName(id, name);
  }

  @Get(':id/business-profile')
  async getBusinessProfile(@Param('id') id: string) {
    return this.tenantService.getBusinessProfile(id);
  }

  @Put(':id/business-profile')
  async updateBusinessProfile(@Param('id') id: string, @Body() dto: UpdateBusinessProfileDto) {
    return this.tenantService.updateBusinessProfile(id, dto);
  }
}
