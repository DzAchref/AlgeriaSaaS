import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { TemplateService } from './template.service';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async createTemplate(@Body() data: any) {
    return this.templateService.createTemplate(data);
  }

  @Get()
  async getTemplates(@Query('tenantId') tenantId: string) {
    return this.templateService.getTemplates(tenantId);
  }

  @Get(':id')
  async getTemplate(@Param('id') id: string) {
    return this.templateService.getTemplate(id);
  }
}
