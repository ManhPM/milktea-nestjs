import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { Import } from './entities/import.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ImportIngredient } from 'src/import_ingredient/entities/import_ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Import, Ingredient, ImportIngredient])],
  controllers: [ImportController],
  providers: [ImportService],
})
export class ImportModule {}
