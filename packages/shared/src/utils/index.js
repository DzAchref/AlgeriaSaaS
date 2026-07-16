"use strict";
// ============================================
// Algeria SaaS Ecosystem — Shared Utilities
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDZD = formatDZD;
exports.calculateTVA = calculateTVA;
exports.reverseTVA = reverseTVA;
exports.calculateFiscalStamp = calculateFiscalStamp;
exports.calculateIRG = calculateIRG;
exports.calculatePayroll = calculatePayroll;
exports.validateRC = validateRC;
exports.validateNIF = validateNIF;
exports.validateNIS = validateNIS;
exports.validateAlgerianPhone = validateAlgerianPhone;
exports.normalizePhone = normalizePhone;
exports.generateInvoiceNumber = generateInvoiceNumber;
exports.formatDateDZ = formatDateDZ;
const algeria_1 = require("../constants/algeria");
// ---- Currency Formatting ----
/**
 * Format amount in DZD with proper locale formatting
 */
function formatDZD(amount, locale = 'fr-DZ') {
    const formatted = amount.toFixed(algeria_1.CURRENCY.DECIMAL_PLACES);
    const [intPart, decPart] = formatted.split('.');
    if (locale === 'ar-DZ') {
        const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, algeria_1.CURRENCY.THOUSAND_SEPARATOR_AR);
        return `${intFormatted}${algeria_1.CURRENCY.DECIMAL_SEPARATOR_AR}${decPart} ${algeria_1.CURRENCY.SYMBOL}`;
    }
    const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, algeria_1.CURRENCY.THOUSAND_SEPARATOR_FR);
    return `${intFormatted}${algeria_1.CURRENCY.DECIMAL_SEPARATOR_FR}${decPart} ${algeria_1.CURRENCY.SYMBOL}`;
}
// ---- TVA (Value Added Tax) ----
/**
 * Calculate TVA for a given amount HT (hors taxe)
 */
function calculateTVA(amountHT, rate = algeria_1.TVA_RATES.STANDARD) {
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
function reverseTVA(amountTTC, rate = algeria_1.TVA_RATES.STANDARD) {
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
function calculateFiscalStamp(invoiceTotal) {
    if (invoiceTotal <= algeria_1.FISCAL_STAMP.THRESHOLD) {
        return { invoiceTotal, stampAmount: 0 };
    }
    const tranches = Math.ceil(invoiceTotal / 100);
    let stampAmount = tranches * algeria_1.FISCAL_STAMP.RATE_PER_TRANCHE;
    stampAmount = Math.max(stampAmount, algeria_1.FISCAL_STAMP.MIN_STAMP);
    stampAmount = Math.min(stampAmount, algeria_1.FISCAL_STAMP.MAX_STAMP);
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
function calculateIRG(monthlyGross) {
    // Annual gross for bracket calculation
    const annualGross = monthlyGross * 12;
    let totalIRG = 0;
    for (const bracket of algeria_1.IRG_BRACKETS) {
        if (annualGross <= bracket.min)
            break;
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
function calculatePayroll(grossSalary) {
    const cnasEmployee = Math.round(grossSalary * algeria_1.CNAS_RATES.EMPLOYEE * 100) / 100;
    const cnasEmployer = Math.round(grossSalary * algeria_1.CNAS_RATES.EMPLOYER * 100) / 100;
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
function validateRC(rc) {
    return algeria_1.BUSINESS_ID_PATTERNS.RC.test(rc.trim());
}
/**
 * Validate NIF (Numéro d'Identification Fiscale)
 */
function validateNIF(nif) {
    return algeria_1.BUSINESS_ID_PATTERNS.NIF.test(nif.trim());
}
/**
 * Validate NIS (Numéro d'Identification Statistique)
 */
function validateNIS(nis) {
    return algeria_1.BUSINESS_ID_PATTERNS.NIS.test(nis.trim());
}
/**
 * Validate Algerian phone number
 */
function validateAlgerianPhone(phone) {
    return algeria_1.PHONE.FORMAT_REGEX.test(phone.trim());
}
/**
 * Normalize phone number to international format (+213...)
 */
function normalizePhone(phone) {
    const cleaned = phone.trim().replace(/\s/g, '');
    if (cleaned.startsWith('+213'))
        return cleaned;
    if (cleaned.startsWith('0'))
        return `+213${cleaned.substring(1)}`;
    return `+213${cleaned}`;
}
// ---- Invoice Numbering ----
/**
 * Generate DGI-compliant sequential invoice number
 * Format: {PREFIX}/{YEAR}/{SEQUENTIAL}
 * Example: FAC/2026/000001
 */
function generateInvoiceNumber(prefix, year, sequence) {
    const seq = String(sequence).padStart(6, '0');
    return `${prefix}/${year}/${seq}`;
}
// ---- Date Utilities ----
/**
 * Format date for Algerian locale
 */
function formatDateDZ(date, locale = 'fr-DZ') {
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
//# sourceMappingURL=index.js.map