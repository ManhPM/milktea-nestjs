export class CreatePaymentDto {
  amount: number;
  description: string;
  paymentDate: Date;
  bookingId: number;
  userId: number;
}
