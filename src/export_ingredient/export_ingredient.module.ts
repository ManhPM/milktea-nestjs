import { Module } from '@nestjs/common';
import { ExportIngredientService } from './export_ingredient.service';
import { ExportIngredientController } from './export_ingredient.controller';
import { ExportIngredient } from './entities/export_ingredient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from '../common/lib';

@Module({
  imports: [TypeOrmModule.forFeature([ExportIngredient])],
  controllers: [ExportIngredientController],
  providers: [ExportIngredientService, MessageService],
})
export class ExportIngredientModule {}
