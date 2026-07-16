// ============================================
// Algeria SaaS Ecosystem — Shared Utilities
// ============================================

import {
  TVA_RATES,
  FISCAL_STAMP,
  IRG_BRACKETS,
  CNAS_RATES,
  CURRENCY,
  BUSINESS_ID_PATTERNS,
  PHONE,
} from '../constants/algeria';
import type {
  TvaCalculation,
  FiscalStampCalculation,
  PayrollCalculation,
} from '../types/index';

// ---- Currency Formatting ----

/**
 * Format amount in DZD with proper locale formatting
 */
export function formatDZD(amount: number, locale: 'fr-DZ' | 'ar-DZ' = 'fr-DZ'): string {
  const formatted = amount.toFixed(CURRENCY.DECIMAL_PLACES);
  const [intPart, decPart] = formatted.split('.');

  if (locale === 'ar-DZ') {
    const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, CURRENCY.THOUSAND_SEPARATOR_AR);
    return `${intFormatted}${CURRENCY.DECIMAL_SEPARATOR_AR}${decPart} ${CURRENCY.SYMBOL}`;
  }

  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, CURRENCY.THOUSAND_SEPARATOR_FR);
  return `${intFormatted}${CURRENCY.DECIMAL_SEPARATOR_FR}${decPart} ${CURRENCY.SYMBOL}`;
}

// ---- TVA (Value Added Tax) ----

/**
 * Calculate TVA for a given amount HT (hors taxe)
 */
export function calculateTVA(amountHT: number, rate: number = TVA_RATES.STANDARD): TvaCalculation {
  const tvaAmount = Math.round(amountHT * rate * 100) / 100;
  const amountTTC = Math.round((amountHT + tvaAmount) * 100) / 100;
  return {
    amountHT: Math.round(amountHT * 100) / 100,
    tvaRate: rate,
    tvaAmount,
    amountTTC,
  };
}

/**
 * Reverse TVA: extract HT from TTC amount
 */
export function reverseTVA(amountTTC: number, rate: number = TVA_RATES.STANDARD): TvaCalculation {
  const amountHT = Math.round((amountTTC / (1 + rate)) * 100) / 100;
  const tvaAmount = Math.round((amountTTC - amountHT) * 100) / 100;
  return {
    amountHT,
    tvaRate: rate,
    tvaAmount,
    amountTTC: Math.round(amountTTC * 100) / 100,
  };
}

// ---- Fiscal Stamp (Timbre Fiscal) ----

/**
 * Calculate fiscal stamp amount for an invoice
 * Applied to cash payments above the threshold
 */
export function calculateFiscalStamp(invoiceTotal: number): FiscalStampCalculation {
  if (invoiceTotal <= FISCAL_STAMP.THRESHOLD) {
    return { invoiceTotal, stampAmount: 0 };
  }

  const tranches = Math.ceil(invoiceTotal / 100);
  let stampAmount = tranches * FISCAL_STAMP.RATE_PER_TRANCHE;
  stampAmount = Math.max(stampAmount, FISCAL_STAMP.MIN_STAMP);
  stampAmount = Math.min(stampAmount, FISCAL_STAMP.MAX_STAMP);

  return {
    invoiceTotal,
    stampAmount: Math.round(stampAmount * 100) / 100,
  };
}

// ---- IRG (Income Tax) ----

/**
 * Calculate IRG (income tax) for a monthly gross salary
 * Uses progressive brackets defined by Algerian tax law
 */
export function calculateIRG(monthlyGross: number): number {
  // Annual gross for bracket calculation
  const annualGross = monthlyGross * 12;
  let totalIRG = 0;

  for (const bracket of IRG_BRACKETS) {
    if (annualGross <= bracket.min) break;

    const taxableInBracket = Math.min(annualGross, bracket.max) - bracket.min;
    if (taxableInBracket > 0) {
      totalIRG += taxableInBracket * bracket.rate;
    }
  }

  // Return monthly IRG
  return Math.round((totalIRG / 12) * 100) / 100;
}

// ---- CNAS (Social Security) ----

/**
 * Calculate full payroll breakdown for a monthly gross salary
 */
export function calculatePayroll(grossSalary: number): PayrollCalculation {
  const cnasEmployee = Math.round(grossSalary * CNAS_RATES.EMPLOYEE * 100) / 100;
  const cnasEmployer = Math.round(grossSalary * CNAS_RATES.EMPLOYER * 100) / 100;

  // IRG is calculated on gross minus employee CNAS contribution
  const taxableIncome = grossSalary - cnasEmployee;
  const irgAmount = calculateIRG(taxableIncome);

  const netSalary = Math.round((grossSalary - cnasEmployee - irgAmount) * 100) / 100;
  const totalCost = Math.round((grossSalary + cnasEmployer) * 100) / 100;

  return {
    grossSalary,
    irgAmount,
    cnasEmployee,
    cnasEmployer,
    netSalary,
    totalCost,
  };
}

// ---- Validation ----

/**
 * Validate Algerian business registration number (RC)
 */
export function validateRC(rc: string): boolean {
  return BUSINESS_ID_PATTERNS.RC.test(rc.trim());
}

/**
 * Validate NIF (Numéro d'Identification Fiscale)
 */
export function validateNIF(nif: string): boolean {
  return BUSINESS_ID_PATTERNS.NIF.test(nif.trim());
}

/**
 * Validate NIS (Numéro d'Identification Statistique)
 */
export function validateNIS(nis: string): boolean {
  return BUSINESS_ID_PATTERNS.NIS.test(nis.trim());
}

/**
 * Validate Algerian phone number
 */
export function validateAlgerianPhone(phone: string): boolean {
  return PHONE.FORMAT_REGEX.test(phone.trim());
}

/**
 * Normalize phone number to international format (+213...)
 */
export function normalizePhone(phone: string): string {
  const cleaned = phone.trim().replace(/\s/g, '');
  if (cleaned.startsWith('+213')) return cleaned;
  if (cleaned.startsWith('0')) return `+213${cleaned.substring(1)}`;
  return `+213${cleaned}`;
}

// ---- Invoice Numbering ----

/**
 * Generate DGI-compliant sequential invoice number
 * Format: {PREFIX}/{YEAR}/{SEQUENTIAL}
 * Example: FAC/2026/000001
 */
export function generateInvoiceNumber(
  prefix: 'FAC' | 'PRO' | 'AVO',
  year: number,
  sequence: number,
): string {
  const seq = String(sequence).padStart(6, '0');
  return `${prefix}/${year}/${seq}`;
}

// ---- Date Utilities ----

/**
 * Format date for Algerian locale
 */
export function formatDateDZ(date: Date, locale: 'fr-DZ' | 'ar-DZ' = 'fr-DZ'): string {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
