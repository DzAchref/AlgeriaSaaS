import { Controller, Post, Param, Body } from '@nestjs/common';
import { RefundService } from './refund.service';

@Controller(':id/refund')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @Post()
  async processRefund(
    @Param('id') id: string,
    @Body('amount') amount?: number,
  ) {
    return this.refundService.processRefund(id, amount);
  }
}
