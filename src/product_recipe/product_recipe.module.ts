import { Module } from '@nestjs/common';
import { ProductRecipeService } from './product_recipe.service';
import { ProductRecipeController } from './product_recipe.controller';

@Module({
  controllers: [ProductRecipeController],
  providers: [ProductRecipeService],
})
export class ProductRecipeModule {}
