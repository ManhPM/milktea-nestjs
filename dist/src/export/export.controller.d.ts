import { ExportService } from './export.service';
import { CreateExportDto } from './dto/create-export.dto';
import { UpdateExportDto } from './dto/update-export.dto';
import { CreateExportIngredientDto } from '../export_ingredient/dto/create-export_ingredient.dto';
import { UpdateExportIngredientDto } from '../export_ingredient/dto/update-export_ingredient.dto';
export declare class ExportController {
    private readonly exportService;
    constructor(exportService: ExportService);
    create(createExportDto: CreateExportDto, req: any): Promise<{
        data: {
            staff: any;
            date: Date;
            description: string;
        } & import("./entities/export.entity").Export;
        message: any;
    }>;
    createIngredientExport(createExportDto: CreateExportIngredientDto): Promise<{
        message: any;
    }>;
    deleteIngredientExport(item: UpdateExportIngredientDto): Promise<{
        message: any;
    }>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<import("./entities/export.entity").Export>;
    completeExport(id: string): Promise<{
        message: any;
    }>;
    findIngredientExport(id: string): Promise<any>;
    update(id: string, updateExportDto: UpdateExportDto): Promise<{
        message: any;
    }>;
    remove(id: string): Promise<{
        message: any;
    }>;
}
