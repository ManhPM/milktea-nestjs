import { RecipeTypeService } from './recipe_type.service';
import { CreateRecipeTypeDto } from './dto/create-recipe_type.dto';
import { DeleteRecipeTypeDto } from './dto/delete-recipe_type.dto';
export declare class RecipeTypeController {
    private readonly recipeTypeService;
    constructor(recipeTypeService: RecipeTypeService);
    create(createRecipeTypeDto: CreateRecipeTypeDto): Promise<{
        message: any;
    }>;
    findAll(id: number): Promise<any>;
    findOne(id: string): string;
    remove(item: DeleteRecipeTypeDto): Promise<{
        message: any;
    }>;
}
