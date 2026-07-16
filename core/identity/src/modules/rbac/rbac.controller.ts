import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.GERANT)
  async getUsers(@Request() req: any) {
    return this.rbacService.getUsers(req.user.tenantId);
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Request() req: any) {
    return this.rbacService.getUser(id, req.user.tenantId);
  }

  @Post(':id/role')
  @Roles(UserRole.ADMIN, UserRole.GERANT)
  async changeRole(
    @Param('id') id: string,
    @Body('role') role: UserRole,
    @Request() req: any
  ) {
    return this.rbacService.changeRole(id, req.user.tenantId, role);
  }
}
