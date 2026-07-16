import { Injectable } from '@nestjs/common';
import { XMLBuilder } from 'fast-xml-parser';

@Injectable()
export class EInvoicingService {
  generateDgiXml(invoiceData: any) {
    // This is a placeholder for the future DGI e-invoicing standard (2027 ready)
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      format: true,
    });

    const dgiFormat = {
      "?xml": { "@_version": "1.0", "@_encoding": "UTF-8" },
      Invoice: {
        "@_xmlns": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
        ID: invoiceData.invoiceNumber || "FAC-000",
        IssueDate: new Date().toISOString().split('T')[0],
        AccountingSupplierParty: {
          Party: {
            PartyName: { Name: invoiceData.supplierName },
            PartyTaxScheme: {
              CompanyID: invoiceData.supplierNif,
              TaxScheme: { ID: "VAT" }
            }
          }
        },
        AccountingCustomerParty: {
          Party: {
            PartyName: { Name: invoiceData.customerName },
            PartyTaxScheme: {
              CompanyID: invoiceData.customerNif,
            }
          }
        },
        LegalMonetaryTotal: {
          LineExtensionAmount: invoiceData.totalHT,
          TaxExclusiveAmount: invoiceData.totalHT,
          TaxInclusiveAmount: invoiceData.totalTTC,
          PayableAmount: invoiceData.totalTTC,
        }
      }
    };

    return builder.build(dgiFormat);
  }
}
