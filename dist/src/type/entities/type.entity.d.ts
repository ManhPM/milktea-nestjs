import { Recipe } from '../../recipe/entities/recipe.entity';
import { RecipeType } from '../../recipe_type/entities/recipe_type.entity';
export declare class Type {
    id: number;
    name: string;
    image: string;
    recipe_types: RecipeType[];
    recipes: Recipe[];
}
