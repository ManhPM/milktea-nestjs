import { Product } from '../../product/entities/product.entity';
import { Recipe } from '../../recipe/entities/recipe.entity';
export declare class ProductRecipe {
    id: number;
    isMain: number;
    recipe: Recipe;
    product: Product;
}
