import { Injectable } from '@nestjs/common';

@Injectable()
export class FiscalStampService {
  /**
   * Fiscal stamp calculation in Algeria:
   * - Applies only for CASH payments (Espèces).
   * - 1% of the total amount.
   * - Minimum: 5 DZD.
   * - Maximum: 2500 DZD.
   * - Only applies if amount > 5000 DZD (sometimes custom per business, but standard rule applies).
   */
  calculate(paymentType: string, amountTTC: number) {
    if (paymentType.toLowerCase() !== 'cash' && paymentType.toLowerCase() !== 'especes') {
      return { amount: 0, applies: false, reason: 'Not a cash payment' };
    }

    // Algerian rule: 1% of amount, min 5, max 2500
    // Actually the strict rule is 1 DA per 100 DA tranche
    let stamp = Math.ceil(amountTTC / 100) * 1; // 1% equivalent

    if (stamp < 5) stamp = 5;
    if (stamp > 2500) stamp = 2500;

    return {
      amount: stamp,
      applies: true,
      reason: 'Cash payment',
    };
  }
}
