import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { InvoiceProduct } from 'src/invoice_product/entities/invoice_product.entity';
import {
  CheckCreateReview,
  CheckExistRecipe,
} from 'src/common/middlewares/middlewares';
import { RecipeService } from 'src/recipe/recipe.service';
import { ProductRecipe } from 'src/product_recipe/entities/product_recipe.entity';
import { RecipeType } from 'src/recipe_type/entities/recipe_type.entity';
import { Type } from 'src/type/entities/type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Review,
      User,
      Recipe,
      Invoice,
      InvoiceProduct,
      ProductRecipe,
      RecipeType,
      Type,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, RecipeService],
})
export class ReviewModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistRecipe)
      .forRoutes({ path: 'review/:id', method: RequestMethod.ALL });
    consumer
      .apply(CheckCreateReview)
      .forRoutes({ path: 'review', method: RequestMethod.POST });
  }
}
