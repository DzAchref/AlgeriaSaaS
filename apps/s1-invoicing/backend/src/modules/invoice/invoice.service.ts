import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from '../../entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async create(data: any) {
    // In reality, we would call the Compliance Engine via SDK to calculate TVA, Stamp, and validate IDs
    const invoice = this.invoiceRepository.create({
      ...data,
      status: InvoiceStatus.DRAFT,
      invoiceNumber: `DRAFT-${Date.now()}`, // compliance engine will generate real one
    });
    return this.invoiceRepository.save(invoice);
  }

  async findAll(tenantId: string) {
    return this.invoiceRepository.find({ where: { tenantId } });
  }

  async findOne(id: string) {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async issue(id: string) {
    const invoice = await this.findOne(id);
    invoice.status = InvoiceStatus.ISSUED;
    // call compliance engine to get real invoice number
    invoice.invoiceNumber = `FAC/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000).toString().padStart(6, '0')}`;
    return this.invoiceRepository.save(invoice);
  }
}
