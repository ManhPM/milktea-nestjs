import { Module } from '@nestjs/common';
import { ExportIngredientService } from './export_ingredient.service';
import { ExportIngredientController } from './export_ingredient.controller';
import { ExportIngredient } from './entities/export_ingredient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExportIngredient])],
  controllers: [ExportIngredientController],
  providers: [ExportIngredientService],
})
export class ExportIngredientModule {}
