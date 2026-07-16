import { Injectable } from '@nestjs/common';

@Injectable()
export class TvaService {
  calculateTva(amountHT: number, tvaRate: number) {
    const tvaAmount = amountHT * (tvaRate / 100);
    const amountTTC = amountHT + tvaAmount;
    
    return {
      amountHT: Number(amountHT.toFixed(2)),
      tvaRate,
      tvaAmount: Number(tvaAmount.toFixed(2)),
      amountTTC: Number(amountTTC.toFixed(2)),
    };
  }

  reverseTva(amountTTC: number, tvaRate: number) {
    const amountHT = amountTTC / (1 + (tvaRate / 100));
    const tvaAmount = amountTTC - amountHT;

    return {
      amountHT: Number(amountHT.toFixed(2)),
      tvaRate,
      tvaAmount: Number(tvaAmount.toFixed(2)),
      amountTTC: Number(amountTTC.toFixed(2)),
    };
  }
}
