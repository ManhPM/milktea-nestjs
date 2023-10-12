import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateImportIngredientDto {
  price: number;
  quantity: number;
  importId: number;
  ingredientId: number;
}
