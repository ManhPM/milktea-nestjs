import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { Export } from './entities/export.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ExportIngredient } from 'src/export_ingredient/entities/export_ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Export, Ingredient, ExportIngredient])],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
