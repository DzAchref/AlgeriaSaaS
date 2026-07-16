import { Controller, Get, Param } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller(':id/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  async getStatus(@Param('id') id: string) {
    return this.statusService.getStatus(id);
  }
}
