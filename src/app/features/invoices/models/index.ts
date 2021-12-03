export interface Client {
  id: string;
  name: string;
}

export interface Invoice {
  id: string;
  subject: string;
  clientId?: string;
  items: InvoiceItem[];
  total: number;
}

export interface InvoiceItem {
  text: string;
  price: number;
}
