import { IsNotEmpty } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty({ message: 'Mã giảm giá không được bỏ trống' })
  couponCode: string;

  @IsNotEmpty({ message: 'Phần trăm giảm giá không được bỏ trống' })
  discountPercentage: number;

  @IsNotEmpty({ message: 'Mô tả không được bỏ trống' })
  description: string;
}
