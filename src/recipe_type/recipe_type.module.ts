import { Module } from '@nestjs/common';
import { RecipeTypeService } from './recipe_type.service';
import { RecipeTypeController } from './recipe_type.controller';
import { RecipeType } from './entities/recipe_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Type } from 'src/type/entities/type.entity';
import { MessageService } from 'src/common/lib';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeType, Recipe, Type])],
  controllers: [RecipeTypeController],
  providers: [RecipeTypeService, MessageService],
})
export class RecipeTypeModule {}
