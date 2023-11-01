import { CreateExportIngredientDto } from './dto/create-export_ingredient.dto';
import { UpdateExportIngredientDto } from './dto/update-export_ingredient.dto';
import { ExportIngredient } from './entities/export_ingredient.entity';
import { Repository } from 'typeorm';
export declare class ExportIngredientService {
    readonly exportIngredientRepository: Repository<ExportIngredient>;
    constructor(exportIngredientRepository: Repository<ExportIngredient>);
    create(createExportIngredientDto: CreateExportIngredientDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateExportIngredientDto: UpdateExportIngredientDto): string;
    remove(id: number): string;
}
