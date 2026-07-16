import { Injectable } from '@nestjs/common';
import { ValidateInvoiceDto } from './dto/validate-invoice.dto';

@Injectable()
export class InvoiceRulesService {
  validateMandatoryFields(dto: ValidateInvoiceDto) {
    const errors = [];
    
    // Simple mock validation for Algerian IDs
    if (!/^\d{2}[A-Z]\d{7}$/.test(dto.rc) && !/^\d{2}\/\d{2}\-\d{7}[A-Z]$/.test(dto.rc)) {
       // Just a rough check, real RC formats vary slightly
    }
    
    if (dto.nif && dto.nif.length !== 15) {
      errors.push('NIF must be exactly 15 digits');
    }

    if (dto.nis && (dto.nis.length !== 15 && dto.nis.length !== 19)) {
      errors.push('NIS must be 15 or 19 digits');
    }

    if (dto.ai && dto.ai.length < 11) {
      errors.push('Article d\'Imposition (AI) must be at least 11 digits');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  async generateNextInvoiceNumber(tenantId: string) {
    // In reality, this would query the DB for the last invoice number for this tenant in the current year
    const year = new Date().getFullYear();
    const sequenceNumber = Math.floor(Math.random() * 1000).toString().padStart(6, '0');
    return {
      invoiceNumber: `FAC/${year}/${sequenceNumber}`,
    };
  }
}
