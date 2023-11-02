import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { ProductRecipe } from '../product_recipe/entities/product_recipe.entity';
import { FilterRecipeDto } from './dto/filter-recipe.dto';
import { RecipeType } from '../recipe_type/entities/recipe_type.entity';
import { Type } from '../type/entities/type.entity';
import { MessageService } from '../common/lib';
import { Wishlist } from '../wishlist/entities/wishlist.entity';
export declare class RecipeService {
    readonly recipeRepository: Repository<Recipe>;
    readonly productRecipeRepository: Repository<ProductRecipe>;
    readonly recipeTypeRepository: Repository<RecipeType>;
    readonly wishlistRepository: Repository<Wishlist>;
    readonly typeRepository: Repository<Type>;
    private readonly messageService;
    constructor(recipeRepository: Repository<Recipe>, productRecipeRepository: Repository<ProductRecipe>, recipeTypeRepository: Repository<RecipeType>, wishlistRepository: Repository<Wishlist>, typeRepository: Repository<Type>, messageService: MessageService);
    create(createRecipeDto: CreateRecipeDto): Promise<{
        message: any;
    }>;
    getDetailRecipe(id: number, req: any): Promise<any>;
    getAllRecipe(query: FilterRecipeDto): Promise<any>;
    getRecipeByType(id: number, req: any): Promise<{
        data: {
            isLiked: number;
            id: number;
            name: string;
            info: string;
            image: string;
            isActive: number;
            price: number;
            discount: number;
            type: Type;
            product_recipes: ProductRecipe[];
            recipe_ingredients: import("../recipe_ingredient/entities/recipe_ingredient.entity").RecipeIngredient[];
            recipe_types: RecipeType[];
            wishlists: Wishlist[];
            reviews: import("../review/entities/review.entity").Review[];
        }[];
    }>;
    getToppingByType(id: number): Promise<{
        data: {}[];
    }>;
    getToppingByRecipe(id: number): Promise<{
        data: {}[];
    }>;
    getAllTopping(): Promise<{
        data: Recipe[];
        total: number;
    }>;
    getAllIngredientOfRecipe(id: number): Promise<{
        data: {}[];
    }>;
    checkExist(id: number): Promise<any>;
    update(id: number, updateRecipeDto: UpdateRecipeDto): Promise<{
        message: any;
    }>;
    remove(id: number): Promise<{
        message: any;
    }>;
}
