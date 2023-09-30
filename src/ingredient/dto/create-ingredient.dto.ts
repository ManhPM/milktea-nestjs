import { IsNotEmpty } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty({ message: 'Tên nguyên liệu không được để trống' })
  name: string;
  @IsNotEmpty({ message: 'Đơn vị không được để trống' })
  unitName: string;
  @IsNotEmpty({ message: 'Hình ảnh không được để trống' })
  image: string;
  isActive: number;
  quantity: number;
}
