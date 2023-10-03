import { IsPositive } from 'class-validator';

export class UpdateRecipeIngredientDto {
  @IsPositive({ message: 'Số lượng phải là số dương' })
  quantity: number;
  recipeId: number;
  ingredientId: number;
}
