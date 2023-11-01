import { Ingredient } from '../../ingredient/entities/ingredient.entity';
import { Recipe } from '../../recipe/entities/recipe.entity';
export declare class RecipeIngredient {
    id: number;
    quantity: number;
    recipe: Recipe;
    ingredient: Ingredient;
}
