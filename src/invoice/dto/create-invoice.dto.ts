export class CreateInvoiceDto {
  total: number;
  shippingFee: number;
  paymentMethod: string;
  date: Date;
  status: number;
  isPrepared: number;
  isPaid: number;
  shippingCompanyId: number;
}
