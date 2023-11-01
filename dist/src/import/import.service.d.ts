import { CreateImportDto } from './dto/create-import.dto';
import { UpdateImportDto } from './dto/update-import.dto';
import { Import } from './entities/import.entity';
import { DataSource, Repository } from 'typeorm';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { ImportIngredient } from '../import_ingredient/entities/import_ingredient.entity';
import { CreateImportIngredientDto } from '../import_ingredient/dto/create-import_ingredient.dto';
import { UpdateImportIngredientDto } from '../import_ingredient/dto/update-import_ingredient.dto';
import { MessageService } from '../common/lib';
import { Recipe } from '../recipe/entities/recipe.entity';
export declare class ImportService {
    readonly importRepository: Repository<Import>;
    readonly recipeRepository: Repository<Recipe>;
    readonly ingredientRepository: Repository<Ingredient>;
    readonly importIngredientRepository: Repository<ImportIngredient>;
    private dataSource;
    private readonly messageService;
    constructor(importRepository: Repository<Import>, recipeRepository: Repository<Recipe>, ingredientRepository: Repository<Ingredient>, importIngredientRepository: Repository<ImportIngredient>, dataSource: DataSource, messageService: MessageService);
    findAll(query: any): Promise<any>;
    findIngredientImport(id: number): Promise<any>;
    findOne(id: number): Promise<Import>;
    completeImport(id: number): Promise<{
        message: any;
    }>;
    create(createImportDto: CreateImportDto, req: any): Promise<{
        data: {
            staff: any;
            date: Date;
            description: string;
        } & Import;
        message: any;
    }>;
    update(id: number, updateImportDto: UpdateImportDto): Promise<{
        message: any;
    }>;
    createIngredientImport(item: CreateImportIngredientDto): Promise<{
        message: any;
    }>;
    deleteIngredientImport(item: UpdateImportIngredientDto): Promise<{
        message: any;
    }>;
    remove(id: number): Promise<{
        message: any;
    }>;
    checkExist(id: number): Promise<any>;
}
