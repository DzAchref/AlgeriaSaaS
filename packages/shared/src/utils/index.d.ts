import type { TvaCalculation, FiscalStampCalculation, PayrollCalculation } from '../types/index';
/**
 * Format amount in DZD with proper locale formatting
 */
export declare function formatDZD(amount: number, locale?: 'fr-DZ' | 'ar-DZ'): string;
/**
 * Calculate TVA for a given amount HT (hors taxe)
 */
export declare function calculateTVA(amountHT: number, rate?: number): TvaCalculation;
/**
 * Reverse TVA: extract HT from TTC amount
 */
export declare function reverseTVA(amountTTC: number, rate?: number): TvaCalculation;
/**
 * Calculate fiscal stamp amount for an invoice
 * Applied to cash payments above the threshold
 */
export declare function calculateFiscalStamp(invoiceTotal: number): FiscalStampCalculation;
/**
 * Calculate IRG (income tax) for a monthly gross salary
 * Uses progressive brackets defined by Algerian tax law
 */
export declare function calculateIRG(monthlyGross: number): number;
/**
 * Calculate full payroll breakdown for a monthly gross salary
 */
export declare function calculatePayroll(grossSalary: number): PayrollCalculation;
/**
 * Validate Algerian business registration number (RC)
 */
export declare function validateRC(rc: string): boolean;
/**
 * Validate NIF (Numéro d'Identification Fiscale)
 */
export declare function validateNIF(nif: string): boolean;
/**
 * Validate NIS (Numéro d'Identification Statistique)
 */
export declare function validateNIS(nis: string): boolean;
/**
 * Validate Algerian phone number
 */
export declare function validateAlgerianPhone(phone: string): boolean;
/**
 * Normalize phone number to international format (+213...)
 */
export declare function normalizePhone(phone: string): string;
/**
 * Generate DGI-compliant sequential invoice number
 * Format: {PREFIX}/{YEAR}/{SEQUENTIAL}
 * Example: FAC/2026/000001
 */
export declare function generateInvoiceNumber(prefix: 'FAC' | 'PRO' | 'AVO', year: number, sequence: number): string;
/**
 * Format date for Algerian locale
 */
export declare function formatDateDZ(date: Date, locale?: 'fr-DZ' | 'ar-DZ'): string;
//# sourceMappingURL=index.d.ts.map