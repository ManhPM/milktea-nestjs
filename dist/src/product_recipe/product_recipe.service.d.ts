import { CreateProductRecipeDto } from './dto/create-product_recipe.dto';
import { UpdateProductRecipeDto } from './dto/update-product_recipe.dto';
export declare class ProductRecipeService {
    create(createProductRecipeDto: CreateProductRecipeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductRecipeDto: UpdateProductRecipeDto): string;
    remove(id: number): string;
}
