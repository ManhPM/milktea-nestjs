import { IsPositive } from 'class-validator';

export class CreateRecipeIngredientDto {
  quantity: number;
  recipeId: number;
  ingredientId: number;
}
