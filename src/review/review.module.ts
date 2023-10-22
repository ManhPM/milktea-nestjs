import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { Invoice } from '../invoice/entities/invoice.entity';
import { InvoiceProduct } from '../invoice_product/entities/invoice_product.entity';
import {
  CheckCreateReview,
  CheckExistRecipe,
} from '../common/middlewares/middlewares';
import { RecipeService } from '../recipe/recipe.service';
import { ProductRecipe } from '../product_recipe/entities/product_recipe.entity';
import { RecipeType } from '../recipe_type/entities/recipe_type.entity';
import { Type } from '../type/entities/type.entity';
import { validateCreateReview } from '../common/middlewares/validate';
import { InvoiceService } from '../invoice/invoice.service';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { CartProduct } from '../cart_product/entities/cart_product.entity';
import { Shop } from '../shop/entities/shop.entity';
import { Product } from '../product/entities/product.entity';
import { ShippingCompany } from '../shipping_company/entities/shipping_company.entity';
import { ProductService } from '../product/product.service';
import { MessageService } from '../common/lib';
import { Wishlist } from '../wishlist/entities/wishlist.entity';

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
      Ingredient,
      CartProduct,
      Shop,
      Product,
      ShippingCompany,
      Wishlist,
    ]),
  ],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    RecipeService,
    InvoiceService,
    ProductService,
    MessageService,
  ],
})
export class ReviewModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistRecipe)
      .forRoutes({ path: 'review/:id', method: RequestMethod.ALL });
    consumer
      .apply(validateCreateReview, CheckCreateReview)
      .forRoutes({ path: 'review', method: RequestMethod.POST });
    consumer
      .apply(validateCreateReview)
      .forRoutes({ path: 'review', method: RequestMethod.POST });
  }
}
