import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { FilterIngredientDto } from './dto/filter-ingredient.dto';
export declare class IngredientController {
    private readonly ingredientService;
    constructor(ingredientService: IngredientService);
    create(createIngredientDto: CreateIngredientDto): Promise<{
        message: any;
    }>;
    findAll(query: FilterIngredientDto): Promise<{
        data: any[];
    }>;
    findOne(id: string): Promise<{
        data: import("./entities/ingredient.entity").Ingredient;
    }>;
    update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<{
        message: any;
    }>;
    remove(id: string): Promise<{
        message: any;
    }>;
}
