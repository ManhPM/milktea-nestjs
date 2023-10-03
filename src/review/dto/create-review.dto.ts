import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  comment: string;
  @IsNotEmpty({ message: 'Số sao đánh giá không được để trống' })
  rating: number;
  date: Date;
  @IsNotEmpty({ message: 'Hình ảnh không được để trống' })
  image: string;
  productId: number;
  invoiceId: number;
}
