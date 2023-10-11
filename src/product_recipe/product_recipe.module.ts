import { Module } from '@nestjs/common';
import { ProductRecipeService } from './product_recipe.service';
import { ProductRecipeController } from './product_recipe.controller';
import { MessageService } from 'src/common/lib';

@Module({
  controllers: [ProductRecipeController],
  providers: [ProductRecipeService, MessageService],
})
export class ProductRecipeModule {}
