import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateImportIngredientDto {
  @IsNotEmpty({ message: 'Giá không được để trống' })
  @IsPositive({ message: 'Giá phải là số dương' })
  price: number;
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  @IsPositive({ message: 'Số lượng phải là số dương' })
  quantity: number;
  importId: number;
  ingredientId: number;
}
