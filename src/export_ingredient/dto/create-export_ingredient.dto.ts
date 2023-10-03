import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateExportIngredientDto {
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  @IsPositive({ message: 'Số lượng phải là số dương' })
  quantity: number;
  @IsNotEmpty({ message: 'Giá không được để trống' })
  @IsPositive({ message: 'Giá phải là số dương' })
  price: number;
  exportId: number;
  ingredientId: number;
}
