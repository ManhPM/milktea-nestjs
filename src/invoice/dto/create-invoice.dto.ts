export class CreateInvoiceDto {
  total: number;
  shippingFee: number;
  date: Date;
  status: number;
  isPaid: number;
  shippingCompanyId: number;
}
