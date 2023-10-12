import { IsPositive } from 'class-validator';

export class UpdateRecipeIngredientDto {
  quantity: number;
  recipeId: number;
  ingredientId: number;
}
