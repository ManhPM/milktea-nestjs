import { RecipeIngredientService } from './recipe_ingredient.service';
import { CreateRecipeIngredientDto } from './dto/create-recipe_ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe_ingredient.dto';
import { DeleteRecipeIngredientDto } from './dto/delete-recipe_ingredient.dto';
export declare class RecipeIngredientController {
    private readonly recipeIngredientService;
    constructor(recipeIngredientService: RecipeIngredientService);
    create(createRecipeIngredientDto: CreateRecipeIngredientDto): Promise<{
        message: any;
    }>;
    findOne(id: string): string;
    update(updateRecipeIngredientDto: UpdateRecipeIngredientDto): Promise<{
        message: any;
    }>;
    remove(item: DeleteRecipeIngredientDto): Promise<{
        message: any;
    }>;
}
