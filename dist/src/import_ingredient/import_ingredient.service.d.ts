import { CreateImportIngredientDto } from './dto/create-import_ingredient.dto';
import { UpdateImportIngredientDto } from './dto/update-import_ingredient.dto';
import { ImportIngredient } from './entities/import_ingredient.entity';
import { Repository } from 'typeorm';
export declare class ImportIngredientService {
    readonly importIngredientRepository: Repository<ImportIngredient>;
    constructor(importIngredientRepository: Repository<ImportIngredient>);
    create(createImportIngredientDto: CreateImportIngredientDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateImportIngredientDto: UpdateImportIngredientDto): string;
    remove(id: number): string;
}
