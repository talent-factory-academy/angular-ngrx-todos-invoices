export interface Client {
  id: string;
  name: string;
  address?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  subject: string;
  clientId: string;
  items: InvoiceItem[];
  total: number;
}

export interface InvoiceItem {
  text: string;
  price: number;
}
