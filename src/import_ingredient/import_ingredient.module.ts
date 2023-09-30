import { Module } from '@nestjs/common';
import { ImportIngredientService } from './import_ingredient.service';
import { ImportIngredientController } from './import_ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportIngredient } from './entities/import_ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImportIngredient])],
  controllers: [ImportIngredientController],
  providers: [ImportIngredientService],
})
export class ImportIngredientModule {}
