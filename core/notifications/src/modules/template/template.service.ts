import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateEntity } from '../../entities/template.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private templateRepository: Repository<TemplateEntity>,
  ) {}

  async createTemplate(data: any) {
    const template = this.templateRepository.create(data);
    return this.templateRepository.save(template);
  }

  async getTemplates(tenantId: string) {
    return this.templateRepository.find({ where: { tenantId } });
  }

  async getTemplate(id: string) {
    const template = await this.templateRepository.findOne({ where: { id } });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }
}
