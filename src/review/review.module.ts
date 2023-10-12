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
import { validateCreateReview } from 'src/common/middlewares/validate';
import { InvoiceService } from 'src/invoice/invoice.service';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { CartProduct } from 'src/cart_product/entities/cart_product.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Product } from 'src/product/entities/product.entity';
import { ShippingCompany } from 'src/shipping_company/entities/shipping_company.entity';
import { ProductService } from 'src/product/product.service';
import { MessageService } from 'src/common/lib';

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
