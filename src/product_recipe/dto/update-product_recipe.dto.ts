import { PartialType } from '@nestjs/swagger';
import { CreateProductRecipeDto } from './create-product_recipe.dto';

export class UpdateProductRecipeDto extends PartialType(CreateProductRecipeDto) {}
