import { ExportIngredient } from '../../export_ingredient/entities/export_ingredient.entity';
import { RecipeIngredient } from '../../recipe_ingredient/entities/recipe_ingredient.entity';
export declare class Ingredient {
    id: number;
    name: string;
    unitName: string;
    image: string;
    isActive: number;
    quantity: number;
    recipe_ingredients: RecipeIngredient[];
    import_ingredients: RecipeIngredient[];
    export_ingredients: ExportIngredient[];
}
