import { Controller, Post, Body, Res } from '@nestjs/common';
import { EInvoicingService } from './e-invoicing.service';

@Controller('e-invoice')
export class EInvoicingController {
  constructor(private readonly eInvoicingService: EInvoicingService) {}

  @Post('generate-xml')
  generateXml(@Body() invoiceData: any, @Res() res: any) {
    const xml = this.eInvoicingService.generateDgiXml(invoiceData);
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  }
}
