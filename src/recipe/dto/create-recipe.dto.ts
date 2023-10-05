import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;
  info: string;
  image: string;
  isActive: number;
  @IsPositive({ message: 'Giá phải là số dương' })
  @IsNotEmpty({ message: 'Giá không được để trống' })
  price: number;
  discount: number;
  typeId: number;
}
