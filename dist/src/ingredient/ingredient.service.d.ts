import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';
import { FilterIngredientDto } from './dto/filter-ingredient.dto';
import { MessageService } from '../common/lib';
import { RecipeIngredient } from '../recipe_ingredient/entities/recipe_ingredient.entity';
export declare class IngredientService {
    readonly ingredientRepository: Repository<Ingredient>;
    readonly recipeIngredientRepository: Repository<RecipeIngredient>;
    private readonly messageService;
    constructor(ingredientRepository: Repository<Ingredient>, recipeIngredientRepository: Repository<RecipeIngredient>, messageService: MessageService);
    checkCreate(name: string, unitName: string): Promise<Ingredient>;
    create(item: CreateIngredientDto): Promise<{
        message: any;
    }>;
    update(id: number, updateIngredientDto: UpdateIngredientDto): Promise<{
        message: any;
    }>;
    remove(id: number): Promise<{
        message: any;
    }>;
    findAll(query: FilterIngredientDto): Promise<{
        data: any[];
    }>;
    findOne(id: number): Promise<{
        data: Ingredient;
    }>;
    checkExist(id: number): Promise<any>;
}
