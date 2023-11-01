import { CreateRecipeIngredientDto } from './dto/create-recipe_ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe_ingredient.dto';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';
import { Repository } from 'typeorm';
import { DeleteRecipeIngredientDto } from './dto/delete-recipe_ingredient.dto';
import { MessageService } from '../common/lib';
import { Recipe } from '../recipe/entities/recipe.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
export declare class RecipeIngredientService {
    readonly recipeIngredientRepository: Repository<RecipeIngredient>;
    readonly recipeRepository: Repository<Recipe>;
    readonly ingredientRepository: Repository<Ingredient>;
    private readonly messageService;
    constructor(recipeIngredientRepository: Repository<RecipeIngredient>, recipeRepository: Repository<Recipe>, ingredientRepository: Repository<Ingredient>, messageService: MessageService);
    create(item: CreateRecipeIngredientDto): Promise<{
        message: any;
    }>;
    findOne(id: number): string;
    update(item: UpdateRecipeIngredientDto): Promise<{
        message: any;
    }>;
    remove(item: DeleteRecipeIngredientDto): Promise<{
        message: any;
    }>;
}
