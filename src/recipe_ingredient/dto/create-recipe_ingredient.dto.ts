import { IsPositive } from 'class-validator';

export class CreateRecipeIngredientDto {
  @IsPositive({ message: 'Số lượng phải là số dương' })
  quantity: number;
  recipeId: number;
  ingredientId: number;
}
