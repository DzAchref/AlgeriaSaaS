import { Controller, Post, Body } from '@nestjs/common';
import { AnpdpService } from './anpdp.service';

@Controller('anpdp')
export class AnpdpController {
  constructor(private readonly anpdpService: AnpdpService) {}

  @Post('check-consent')
  checkConsent(@Body('tenantId') tenantId: string, @Body('userId') userId: string) {
    return this.anpdpService.checkConsent(tenantId, userId);
  }

  @Post('record-consent')
  recordConsent(@Body() data: any) {
    return this.anpdpService.recordConsent(data);
  }
}
