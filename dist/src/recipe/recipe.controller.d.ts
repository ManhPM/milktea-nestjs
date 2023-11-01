import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FilterRecipeDto } from './dto/filter-recipe.dto';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    create(createRecipeDto: CreateRecipeDto): Promise<{
        message: any;
    }>;
    findAll(query: FilterRecipeDto): Promise<any>;
    getRecipeByType(id: string, req: any): Promise<{
        data: {
            isLiked: number;
            id: number;
            name: string;
            info: string;
            image: string;
            isActive: number;
            price: number;
            discount: number;
            type: import("../type/entities/type.entity").Type;
            product_recipes: import("../product_recipe/entities/product_recipe.entity").ProductRecipe[];
            recipe_ingredients: import("../recipe_ingredient/entities/recipe_ingredient.entity").RecipeIngredient[];
            recipe_types: import("../recipe_type/entities/recipe_type.entity").RecipeType[];
            wishlists: import("../wishlist/entities/wishlist.entity").Wishlist[];
            reviews: import("../review/entities/review.entity").Review[];
        }[];
    }>;
    getDetail(id: string): Promise<any>;
    getAllIngredientOfRecipe(id: string): Promise<{
        data: {}[];
    }>;
    getAllTopping(): Promise<{
        data: import("./entities/recipe.entity").Recipe[];
        total: number;
    }>;
    getToppingByType(id: string): Promise<{
        data: {}[];
    }>;
    getToppingByRecipe(id: string): Promise<{
        data: {}[];
    }>;
    update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<{
        message: any;
    }>;
    remove(id: string): Promise<{
        message: any;
    }>;
}
