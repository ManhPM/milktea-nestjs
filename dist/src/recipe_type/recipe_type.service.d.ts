import { CreateRecipeTypeDto } from './dto/create-recipe_type.dto';
import { DeleteRecipeTypeDto } from './dto/delete-recipe_type.dto';
import { RecipeType } from './entities/recipe_type.entity';
import { Repository } from 'typeorm';
import { Recipe } from '../recipe/entities/recipe.entity';
import { Type } from '../type/entities/type.entity';
import { MessageService } from '../common/lib';
export declare class RecipeTypeService {
    readonly recipeTypeRepository: Repository<RecipeType>;
    readonly recipeRepository: Repository<Recipe>;
    readonly typeRepository: Repository<Type>;
    private readonly messageService;
    constructor(recipeTypeRepository: Repository<RecipeType>, recipeRepository: Repository<Recipe>, typeRepository: Repository<Type>, messageService: MessageService);
    create(item: CreateRecipeTypeDto): Promise<{
        message: any;
    }>;
    findAll(id: number): Promise<any>;
    remove(item: DeleteRecipeTypeDto): Promise<{
        message: any;
    }>;
    findOne(id: number): string;
    update(id: number): string;
}
