"use strict";
// ============================================
// Algeria SaaS Ecosystem — Algeria-Specific Constants
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHONE = exports.PAYMENT_METHODS = exports.SNMG = exports.BUSINESS_ID_PATTERNS = exports.CURRENCY = exports.CNAS_RATES = exports.IRG_BRACKETS = exports.FISCAL_STAMP = exports.TVA_RATES = exports.WILAYAS = void 0;
/**
 * 48 Wilayas (Provinces) of Algeria + 10 new wilayas (2019)
 * Used across all SaaS modules for address forms, shipping, etc.
 */
exports.WILAYAS = [
    { code: '01', name: 'Adrar', nameAr: 'أدرار' },
    { code: '02', name: 'Chlef', nameAr: 'الشلف' },
    { code: '03', name: 'Laghouat', nameAr: 'الأغواط' },
    { code: '04', name: 'Oum El Bouaghi', nameAr: 'أم البواقي' },
    { code: '05', name: 'Batna', nameAr: 'باتنة' },
    { code: '06', name: 'Béjaïa', nameAr: 'بجاية' },
    { code: '07', name: 'Biskra', nameAr: 'بسكرة' },
    { code: '08', name: 'Béchar', nameAr: 'بشار' },
    { code: '09', name: 'Blida', nameAr: 'البليدة' },
    { code: '10', name: 'Bouira', nameAr: 'البويرة' },
    { code: '11', name: 'Tamanrasset', nameAr: 'تمنراست' },
    { code: '12', name: 'Tébessa', nameAr: 'تبسة' },
    { code: '13', name: 'Tlemcen', nameAr: 'تلمسان' },
    { code: '14', name: 'Tiaret', nameAr: 'تيارت' },
    { code: '15', name: 'Tizi Ouzou', nameAr: 'تيزي وزو' },
    { code: '16', name: 'Alger', nameAr: 'الجزائر' },
    { code: '17', name: 'Djelfa', nameAr: 'الجلفة' },
    { code: '18', name: 'Jijel', nameAr: 'جيجل' },
    { code: '19', name: 'Sétif', nameAr: 'سطيف' },
    { code: '20', name: 'Saïda', nameAr: 'سعيدة' },
    { code: '21', name: 'Skikda', nameAr: 'سكيكدة' },
    { code: '22', name: 'Sidi Bel Abbès', nameAr: 'سيدي بلعباس' },
    { code: '23', name: 'Annaba', nameAr: 'عنابة' },
    { code: '24', name: 'Guelma', nameAr: 'قالمة' },
    { code: '25', name: 'Constantine', nameAr: 'قسنطينة' },
    { code: '26', name: 'Médéa', nameAr: 'المدية' },
    { code: '27', name: 'Mostaganem', nameAr: 'مستغانم' },
    { code: '28', name: "M'Sila", nameAr: 'المسيلة' },
    { code: '29', name: 'Mascara', nameAr: 'معسكر' },
    { code: '30', name: 'Ouargla', nameAr: 'ورقلة' },
    { code: '31', name: 'Oran', nameAr: 'وهران' },
    { code: '32', name: 'El Bayadh', nameAr: 'البيض' },
    { code: '33', name: 'Illizi', nameAr: 'إليزي' },
    { code: '34', name: 'Bordj Bou Arréridj', nameAr: 'برج بوعريريج' },
    { code: '35', name: 'Boumerdès', nameAr: 'بومرداس' },
    { code: '36', name: 'El Tarf', nameAr: 'الطارف' },
    { code: '37', name: 'Tindouf', nameAr: 'تندوف' },
    { code: '38', name: 'Tissemsilt', nameAr: 'تيسمسيلت' },
    { code: '39', name: 'El Oued', nameAr: 'الوادي' },
    { code: '40', name: 'Khenchela', nameAr: 'خنشلة' },
    { code: '41', name: 'Souk Ahras', nameAr: 'سوق أهراس' },
    { code: '42', name: 'Tipaza', nameAr: 'تيبازة' },
    { code: '43', name: 'Mila', nameAr: 'ميلة' },
    { code: '44', name: 'Aïn Defla', nameAr: 'عين الدفلى' },
    { code: '45', name: 'Naâma', nameAr: 'النعامة' },
    { code: '46', name: 'Aïn Témouchent', nameAr: 'عين تموشنت' },
    { code: '47', name: 'Ghardaïa', nameAr: 'غرداية' },
    { code: '48', name: 'Relizane', nameAr: 'غليزان' },
    // New wilayas (2019 administrative reform)
    { code: '49', name: 'Timimoun', nameAr: 'تيميمون' },
    { code: '50', name: 'Bordj Badji Mokhtar', nameAr: 'برج باجي مختار' },
    { code: '51', name: 'Ouled Djellal', nameAr: 'أولاد جلال' },
    { code: '52', name: 'Béni Abbès', nameAr: 'بني عباس' },
    { code: '53', name: 'In Salah', nameAr: 'عين صالح' },
    { code: '54', name: 'In Guezzam', nameAr: 'عين قزام' },
    { code: '55', name: 'Touggourt', nameAr: 'تقرت' },
    { code: '56', name: 'Djanet', nameAr: 'جانت' },
    { code: '57', name: "El M'Ghair", nameAr: 'المغير' },
    { code: '58', name: 'El Meniaa', nameAr: 'المنيعة' },
];
/**
 * TVA (Value Added Tax) rates in Algeria
 */
exports.TVA_RATES = {
    STANDARD: 0.19, // 19% — default rate
    REDUCED: 0.09, // 9%  — essential goods, some services
    EXEMPT: 0, // 0%  — exempt items
};
/**
 * Fiscal stamp rates (timbre fiscal) per transaction
 * Applied to cash receipts and certain commercial documents
 */
exports.FISCAL_STAMP = {
    THRESHOLD: 5000, // DZD — stamp applies above this amount
    RATE_PER_TRANCHE: 2.5, // DZD per 100 DZD tranche
    MIN_STAMP: 5, // Minimum stamp amount
    MAX_STAMP: 2500, // Maximum stamp amount
};
/**
 * IRG (Impôt sur le Revenu Global) — Income Tax Brackets (2024+)
 * Progressive brackets for salary taxation
 */
exports.IRG_BRACKETS = [
    { min: 0, max: 30000, rate: 0.00 }, // 0% up to 30,000 DZD
    { min: 30001, max: 120000, rate: 0.20 }, // 20% from 30,001 to 120,000
    { min: 120001, max: 360000, rate: 0.30 }, // 30% from 120,001 to 360,000
    { min: 360001, max: Infinity, rate: 0.35 }, // 35% above 360,000
];
/**
 * CNAS (Caisse Nationale des Assurances Sociales) contribution rates
 */
exports.CNAS_RATES = {
    EMPLOYEE: 0.09, // 9% employee contribution
    EMPLOYER: 0.265, // 26.5% employer contribution (includes all sub-funds)
    TOTAL: 0.355, // 35.5% total
};
/**
 * Currency configuration
 */
exports.CURRENCY = {
    CODE: 'DZD',
    SYMBOL: 'د.ج',
    NAME: 'Dinar Algérien',
    NAME_AR: 'دينار جزائري',
    DECIMAL_PLACES: 2,
    THOUSAND_SEPARATOR_FR: '.',
    DECIMAL_SEPARATOR_FR: ',',
    THOUSAND_SEPARATOR_AR: '٬',
    DECIMAL_SEPARATOR_AR: '٫',
};
/**
 * Business registration field patterns (regex validation)
 */
exports.BUSINESS_ID_PATTERNS = {
    RC: /^\d{2}\/\d{2}-\d{7}[A-Z]\d{2}$/, // Registre de Commerce
    NIF: /^\d{15}$/, // Numéro d'Identification Fiscale (15 digits)
    NIS: /^\d{12,15}$/, // Numéro d'Identification Statistique
    AI: /^\d{11,15}$/, // Article d'Imposition
    CCP: /^\d{10,12}\s*CLE\s*\d{2}$/i, // CCP account number
};
/**
 * Minimum wage (SNMG) — updated periodically
 */
exports.SNMG = {
    MONTHLY: 20000, // DZD per month (as of 2024)
    DAILY: 769, // DZD per day (26 working days)
};
/**
 * Supported payment methods in Algeria
 */
exports.PAYMENT_METHODS = [
    { id: 'chargily', name: 'Chargily Pay', nameAr: 'شارجيلي باي', type: 'gateway' },
    { id: 'cib', name: 'Carte CIB', nameAr: 'بطاقة CIB', type: 'card' },
    { id: 'edahabia', name: 'Carte Edahabia', nameAr: 'بطاقة الذهبية', type: 'card' },
    { id: 'baridimob', name: 'BaridiMob', nameAr: 'بريدي موب', type: 'mobile' },
    { id: 'cash', name: 'Espèces', nameAr: 'نقدا', type: 'cash' },
    { id: 'ccp', name: 'Virement CCP', nameAr: 'حوالة بريدية', type: 'transfer' },
];
/**
 * Phone number format for Algeria
 */
exports.PHONE = {
    COUNTRY_CODE: '+213',
    MOBILE_PREFIXES: ['05', '06', '07'], // Mobilis, Djezzy, Ooredoo
    LANDLINE_PREFIXES: ['021', '023', '025', '027', '029', '031', '033', '035', '037', '041', '043', '045', '048'],
    FORMAT_REGEX: /^(\+213|0)(5|6|7)\d{8}$/,
};
//# sourceMappingURL=algeria.js.map