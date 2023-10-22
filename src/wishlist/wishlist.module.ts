import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { User } from '../user/entities/user.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { CheckExistRecipe } from '../common/middlewares/middlewares';
import { RecipeService } from '../recipe/recipe.service';
import { ProductRecipe } from '../product_recipe/entities/product_recipe.entity';
import { RecipeType } from '../recipe_type/entities/recipe_type.entity';
import { Type } from '../type/entities/type.entity';
import { MessageService } from '../common/lib';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Wishlist,
      User,
      Recipe,
      ProductRecipe,
      RecipeType,
      Type,
    ]),
  ],
  controllers: [WishlistController],
  providers: [WishlistService, RecipeService, MessageService],
})
export class WishlistModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistRecipe)
      .forRoutes({ path: 'wishlist/:id', method: RequestMethod.POST });
  }
}
