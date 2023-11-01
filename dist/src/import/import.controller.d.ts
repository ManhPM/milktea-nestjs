import { ImportService } from './import.service';
import { CreateImportDto } from './dto/create-import.dto';
import { UpdateImportDto } from './dto/update-import.dto';
import { CreateImportIngredientDto } from '../import_ingredient/dto/create-import_ingredient.dto';
import { UpdateImportIngredientDto } from '../import_ingredient/dto/update-import_ingredient.dto';
export declare class ImportController {
    private readonly importService;
    constructor(importService: ImportService);
    create(createImportDto: CreateImportDto, req: any): Promise<{
        data: {
            staff: any;
            date: Date;
            description: string;
        } & import("./entities/import.entity").Import;
        message: any;
    }>;
    createIngredientImport(createImportDto: CreateImportIngredientDto): Promise<{
        message: any;
    }>;
    deleteIngredientImport(item: UpdateImportIngredientDto): Promise<{
        message: any;
    }>;
    findAll(query: any): Promise<any>;
    findIngredientImport(id: number): Promise<any>;
    completeImport(id: number): Promise<{
        message: any;
    }>;
    findOne(id: string): Promise<import("./entities/import.entity").Import>;
    update(id: string, updateImportDto: UpdateImportDto): Promise<{
        message: any;
    }>;
    remove(id: string): Promise<{
        message: any;
    }>;
}
