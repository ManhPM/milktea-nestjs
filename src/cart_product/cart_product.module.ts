import { Module } from '@nestjs/common';
import { CartProductService } from './cart_product.service';
import { CartProductController } from './cart_product.controller';
import { CartProduct } from './entities/cart_product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductRecipe } from 'src/product_recipe/entities/product_recipe.entity';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

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
  providers: [CartProductService],
})
export class CartProductModule {}
