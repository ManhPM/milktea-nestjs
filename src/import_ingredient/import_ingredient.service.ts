import { Injectable } from '@nestjs/common';
import { CreateImportIngredientDto } from './dto/create-import_ingredient.dto';
import { UpdateImportIngredientDto } from './dto/update-import_ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImportIngredient } from './entities/import_ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImportIngredientService {
  constructor(
    @InjectRepository(ImportIngredient)
    readonly importIngredientRepository: Repository<ImportIngredient>,
  ) {}
  create(createImportIngredientDto: CreateImportIngredientDto) {
    return 'This action adds a new importIngredient';
  }

  findAll() {
    return `This action returns all importIngredient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} importIngredient`;
  }

  update(id: number, updateImportIngredientDto: UpdateImportIngredientDto) {
    return `This action updates a #${id} importIngredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} importIngredient`;
  }
}
