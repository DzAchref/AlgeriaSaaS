export interface Tenant {
    id: string;
    name: string;
    slug: string;
    businessProfile: BusinessProfile;
    plan: PlanTier;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface BusinessProfile {
    companyName: string;
    companyNameAr?: string;
    rc: string;
    nif: string;
    nis: string;
    ai: string;
    capitalSocial?: number;
    address: Address;
    phone: string;
    email: string;
    legalForm: AlgerianLegalForm;
}
export type AlgerianLegalForm = 'AUTO_ENTREPRENEUR' | 'EURL' | 'SARL' | 'SPA' | 'SNC' | 'GIE' | 'ASSOCIATION';
export interface Address {
    street: string;
    streetAr?: string;
    city: string;
    cityAr?: string;
    wilaya: string;
    wilayaCode: string;
    postalCode: string;
    country: string;
}
export type PlanTier = 'free' | 'starter' | 'pro' | 'enterprise';
export type UserRole = 'gerant' | 'comptable' | 'caissier' | 'employe' | 'admin';
export interface User {
    id: string;
    tenantId: string;
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
    firstNameAr?: string;
    lastNameAr?: string;
    role: UserRole;
    locale: SupportedLocale;
    isActive: boolean;
    createdAt: Date;
}
export type SupportedLocale = 'fr-DZ' | 'ar-DZ';
export type TextDirection = 'ltr' | 'rtl';
export declare const LOCALE_CONFIG: Record<SupportedLocale, {
    name: string;
    dir: TextDirection;
    nativeName: string;
}>;
export type PaymentProvider = 'chargily' | 'satim' | 'edahabia' | 'baridimob' | 'cash';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
export type Currency = 'DZD';
export interface PaymentRequest {
    amount: number;
    currency: Currency;
    provider: PaymentProvider;
    description: string;
    descriptionAr?: string;
    tenantId: string;
    metadata?: Record<string, string>;
    callbackUrl?: string;
    webhookUrl?: string;
}
export interface PaymentResult {
    id: string;
    status: PaymentStatus;
    provider: PaymentProvider;
    amount: number;
    currency: Currency;
    providerTransactionId?: string;
    checkoutUrl?: string;
    createdAt: Date;
}
export type InvoiceType = 'definitive' | 'proforma' | 'avoir';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export interface InvoiceLineItem {
    id: string;
    description: string;
    descriptionAr?: string;
    quantity: number;
    unitPrice: number;
    tvaRate: number;
    tvaAmount: number;
    totalHT: number;
    totalTTC: number;
}
export interface Invoice {
    id: string;
    tenantId: string;
    invoiceNumber: string;
    type: InvoiceType;
    status: InvoiceStatus;
    clientName: string;
    clientNif?: string;
    clientRc?: string;
    clientAddress?: Address;
    lineItems: InvoiceLineItem[];
    totalHT: number;
    totalTVA: number;
    totalTTC: number;
    fiscalStamp: number;
    grandTotal: number;
    issueDate: Date;
    dueDate?: Date;
    notes?: string;
    notesAr?: string;
    locale: SupportedLocale;
    createdAt: Date;
    updatedAt: Date;
}
export type NotificationChannel = 'whatsapp' | 'sms' | 'email';
export type NotificationStatus = 'queued' | 'sent' | 'delivered' | 'failed';
export interface NotificationRequest {
    channel: NotificationChannel;
    recipient: string;
    templateId?: string;
    subject?: string;
    body: string;
    bodyAr?: string;
    metadata?: Record<string, string>;
}
export interface TvaCalculation {
    amountHT: number;
    tvaRate: number;
    tvaAmount: number;
    amountTTC: number;
}
export interface FiscalStampCalculation {
    invoiceTotal: number;
    stampAmount: number;
}
export interface PayrollCalculation {
    grossSalary: number;
    irgAmount: number;
    cnasEmployee: number;
    cnasEmployer: number;
    netSalary: number;
    totalCost: number;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        messageAr?: string;
    };
    meta?: {
        page?: number;
        perPage?: number;
        total?: number;
    };
}
//# sourceMappingURL=index.d.ts.map