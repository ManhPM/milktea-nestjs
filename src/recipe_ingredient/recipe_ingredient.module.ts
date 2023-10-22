import { Module } from '@nestjs/common';
import { RecipeIngredientService } from './recipe_ingredient.service';
import { RecipeIngredientController } from './recipe_ingredient.controller';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from '../common/lib';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { Recipe } from '../recipe/entities/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeIngredient, Recipe, Ingredient])],
  controllers: [RecipeIngredientController],
  providers: [RecipeIngredientService, MessageService],
})
export class RecipeIngredientModule {}
