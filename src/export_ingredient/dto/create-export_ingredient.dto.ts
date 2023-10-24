import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateExportIngredientDto {
  quantity: string;
  price: string;
  exportId: string;
  ingredientId: string;
}
