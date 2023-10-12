import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductRecipeService } from './product_recipe.service';
import { CreateProductRecipeDto } from './dto/create-product_recipe.dto';
import { UpdateProductRecipeDto } from './dto/update-product_recipe.dto';

@Controller('product-recipe')
export class ProductRecipeController {
  constructor(private readonly productRecipeService: ProductRecipeService) {}

  @Post()
  create(@Body() createProductRecipeDto: CreateProductRecipeDto) {
    return this.productRecipeService.create(createProductRecipeDto);
  }

  @Get()
  findAll() {
    return this.productRecipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productRecipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductRecipeDto: UpdateProductRecipeDto) {
    return this.productRecipeService.update(+id, updateProductRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productRecipeService.remove(+id);
  }
}
