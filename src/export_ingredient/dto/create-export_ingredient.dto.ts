import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateExportIngredientDto {
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  @IsPositive({ message: 'Số lượng phải là số dương' })
  quantity: number;
  exportId: number;
  ingredientId: number;
}
