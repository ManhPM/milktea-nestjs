import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRecipe } from '../product_recipe/entities/product_recipe.entity';
import { RecipeType } from '../recipe_type/entities/recipe_type.entity';
import { Type } from '../type/entities/type.entity';
import {
  CheckExistRecipe,
  CheckExistType,
} from '../common/middlewares/middlewares';
import { TypeService } from '../type/type.service';
import {
  validateCreateRecipe,
  validateUpdateRecipe,
} from '../common/middlewares/validate';
import { MessageService } from '../common/lib';
import { Wishlist } from '../wishlist/entities/wishlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recipe,
      ProductRecipe,
      RecipeType,
      Type,
      Wishlist,
    ]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService, TypeService, MessageService],
})
export class RecipeModule implements NestModule {
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
      .apply(validateCreateRecipe)
      .forRoutes({ path: 'recipe', method: RequestMethod.POST });
    consumer
      .apply(validateUpdateRecipe)
      .forRoutes({ path: 'recipe', method: RequestMethod.PATCH });
  }
}
