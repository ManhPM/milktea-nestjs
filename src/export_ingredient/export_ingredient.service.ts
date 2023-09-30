import { Injectable } from '@nestjs/common';
import { CreateExportIngredientDto } from './dto/create-export_ingredient.dto';
import { UpdateExportIngredientDto } from './dto/update-export_ingredient.dto';
import { ExportIngredient } from './entities/export_ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExportIngredientService {
  constructor(
    @InjectRepository(ExportIngredient)
    readonly exportIngredientRepository: Repository<ExportIngredient>,
  ) {}
  create(createExportIngredientDto: CreateExportIngredientDto) {
    return 'This action adds a new exportIngredient';
  }

  findAll() {
    return `This action returns all exportIngredient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exportIngredient`;
  }

  update(id: number, updateExportIngredientDto: UpdateExportIngredientDto) {
    return `This action updates a #${id} exportIngredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} exportIngredient`;
  }
}
