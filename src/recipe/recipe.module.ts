import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRecipe } from 'src/product_recipe/entities/product_recipe.entity';
import { RecipeType } from 'src/recipe_type/entities/recipe_type.entity';
import { Type } from 'src/type/entities/type.entity';
import {
  CheckExistRecipe,
  CheckExistType,
} from 'src/common/middlewares/middlewares';
import { TypeService } from 'src/type/type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, ProductRecipe, RecipeType, Type]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService, TypeService],
})
export class RecipeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistRecipe)
      .forRoutes(
        { path: 'recipe/menu/:id', method: RequestMethod.ALL },
        { path: 'recipe/ingredient/:id', method: RequestMethod.GET },
        { path: 'recipe/recipe-topping/:id', method: RequestMethod.GET },
      );
    consumer
      .apply(CheckExistType)
      .forRoutes(
        { path: 'recipe/menu/:id', method: RequestMethod.GET },
        { path: 'recipe/type-topping/:id', method: RequestMethod.GET },
      );
    consumer
      .apply(CheckExistType)
      .forRoutes({ path: 'recipe/ingredient/:id', method: RequestMethod.GET });
  }
}
