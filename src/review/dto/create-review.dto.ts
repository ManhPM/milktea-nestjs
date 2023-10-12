export class CreateReviewDto {
  comment: string;
  rating: number;
  date: Date;
  image: string;
  productId: number;
  invoiceId: number;
}
