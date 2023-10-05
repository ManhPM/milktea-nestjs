import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { CheckExistRecipe } from 'src/common/middlewares/middlewares';
import { RecipeService } from 'src/recipe/recipe.service';
import { ProductRecipe } from 'src/product_recipe/entities/product_recipe.entity';
import { RecipeType } from 'src/recipe_type/entities/recipe_type.entity';
import { Type } from 'src/type/entities/type.entity';

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
  providers: [WishlistService, RecipeService],
})
export class WishlistModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistRecipe)
      .forRoutes({ path: 'wishlist/:id', method: RequestMethod.POST });
  }
}
