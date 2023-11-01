import { ProductRecipeService } from './product_recipe.service';
import { CreateProductRecipeDto } from './dto/create-product_recipe.dto';
import { UpdateProductRecipeDto } from './dto/update-product_recipe.dto';
export declare class ProductRecipeController {
    private readonly productRecipeService;
    constructor(productRecipeService: ProductRecipeService);
    create(createProductRecipeDto: CreateProductRecipeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProductRecipeDto: UpdateProductRecipeDto): string;
    remove(id: string): string;
}
