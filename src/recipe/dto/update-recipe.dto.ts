import { IsPositive } from 'class-validator';

export class UpdateRecipeDto {
  name: string;
  info: string;
  image: string;
  isActive: number;
  @IsPositive({ message: 'Giảm giá phải là số dương' })
  price: number;
  @IsPositive({ message: 'Giảm giá phải là số dương' })
  discount: number;
  typeId: number;
}
