import { Module } from '@nestjs/common';
import { RecipeIngredientService } from './recipe_ingredient.service';
import { RecipeIngredientController } from './recipe_ingredient.controller';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from 'src/common/lib';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeIngredient])],
  controllers: [RecipeIngredientController],
  providers: [RecipeIngredientService, MessageService],
})
export class RecipeIngredientModule {}
