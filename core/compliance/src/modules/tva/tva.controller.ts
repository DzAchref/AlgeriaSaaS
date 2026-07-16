import { Controller, Post, Body } from '@nestjs/common';
import { TvaService } from './tva.service';
import { CalculateTvaDto } from './dto/calculate-tva.dto';

@Controller('tva')
export class TvaController {
  constructor(private readonly tvaService: TvaService) {}

  @Post('calculate')
  calculate(@Body() dto: CalculateTvaDto) {
    return this.tvaService.calculateTva(dto.amountHT, dto.tvaRate);
  }

  @Post('reverse')
  reverse(@Body() dto: CalculateTvaDto) {
    // Note: dto.amountHT here is actually TTC, reusing dto for simplicity
    return this.tvaService.reverseTva(dto.amountHT, dto.tvaRate);
  }
}
