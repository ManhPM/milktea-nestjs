import { IsNotEmpty } from 'class-validator';

export class CreateImportIngredientDto {
  @IsNotEmpty({ message: 'Đơn giá không được để trống' })
  unitPrice: number;
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  quantity: number;
  importId: number;
  ingredientId: number;
}
