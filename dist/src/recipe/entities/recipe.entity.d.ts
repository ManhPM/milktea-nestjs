import { ProductRecipe } from '../../product_recipe/entities/product_recipe.entity';
import { RecipeIngredient } from '../../recipe_ingredient/entities/recipe_ingredient.entity';
import { RecipeType } from '../../recipe_type/entities/recipe_type.entity';
import { Review } from '../../review/entities/review.entity';
import { Type } from '../../type/entities/type.entity';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';
export declare class Recipe {
    id: number;
    name: string;
    info: string;
    image: string;
    isActive: number;
    price: number;
    discount: number;
    type: Type;
    product_recipes: ProductRecipe[];
    recipe_ingredients: RecipeIngredient[];
    recipe_types: RecipeType[];
    wishlists: Wishlist[];
    reviews: Review[];
}
