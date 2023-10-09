import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateExportIngredientDto {
  quantity: number;
  price: number;
  exportId: number;
  ingredientId: number;
}
