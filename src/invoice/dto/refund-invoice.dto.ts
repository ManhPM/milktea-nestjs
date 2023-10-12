export class RefundPaymentDto {
  id_order: number;
  transDate: Date;
  amount: number;
  transType: number;
  user: number;
  bank_account_number: number;
}
