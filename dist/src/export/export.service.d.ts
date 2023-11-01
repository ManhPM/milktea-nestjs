import { CreateExportDto } from './dto/create-export.dto';
import { UpdateExportDto } from './dto/update-export.dto';
import { DataSource, Repository } from 'typeorm';
import { Export } from './entities/export.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { ExportIngredient } from '../export_ingredient/entities/export_ingredient.entity';
import { CreateExportIngredientDto } from '../export_ingredient/dto/create-export_ingredient.dto';
import { UpdateExportIngredientDto } from '../export_ingredient/dto/update-export_ingredient.dto';
import { MessageService } from '../common/lib';
import { Recipe } from '../recipe/entities/recipe.entity';
export declare class ExportService {
    readonly exportRepository: Repository<Export>;
    readonly ingredientRepository: Repository<Ingredient>;
    readonly recipeRepository: Repository<Recipe>;
    readonly exportIngredientRepository: Repository<ExportIngredient>;
    private dataSource;
    private readonly messageService;
    constructor(exportRepository: Repository<Export>, ingredientRepository: Repository<Ingredient>, recipeRepository: Repository<Recipe>, exportIngredientRepository: Repository<ExportIngredient>, dataSource: DataSource, messageService: MessageService);
    findAll(query: any): Promise<any>;
    findOne(id: number): Promise<Export>;
    findIngredientExport(id: number): Promise<any>;
    create(item: CreateExportDto, req: any): Promise<{
        data: {
            staff: any;
            date: Date;
            description: string;
        } & Export;
        message: any;
    }>;
    createIngredientExport(item: CreateExportIngredientDto): Promise<{
        message: any;
    }>;
    deleteIngredientExport(item: UpdateExportIngredientDto): Promise<{
        message: any;
    }>;
    completeExport(id: number): Promise<{
        message: any;
    }>;
    update(id: number, item: UpdateExportDto): Promise<{
        message: any;
    }>;
    remove(id: number): Promise<{
        message: any;
    }>;
    checkExist(id: number): Promise<any>;
}
