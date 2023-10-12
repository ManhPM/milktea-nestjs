import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CartProductService } from './cart_product.service';
import { CartProductController } from './cart_product.controller';
import { CartProduct } from './entities/cart_product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductRecipe } from 'src/product_recipe/entities/product_recipe.entity';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { CheckExistProduct } from 'src/common/middlewares/middlewares';
import { ProductService } from 'src/product/product.service';
import {
  validateCreateCartProduct,
  validateUpdateCartProduct,
} from 'src/common/middlewares/validate';
import { MessageService } from 'src/common/lib';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartProduct,
      Product,
      ProductRecipe,
      User,
      Recipe,
    ]),
  ],
  controllers: [CartProductController],
  providers: [CartProductService, ProductService, MessageService],
})
export class CartProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistProduct)
      .forRoutes({ path: 'cart-product/:id', method: RequestMethod.ALL });
    consumer
      .apply(validateCreateCartProduct)
      .forRoutes({ path: 'cart-product', method: RequestMethod.POST });
    consumer
      .apply(validateUpdateCartProduct)
      .forRoutes({ path: 'cart-product', method: RequestMethod.PATCH });
  }
}
