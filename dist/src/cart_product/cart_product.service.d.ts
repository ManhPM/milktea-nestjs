import { CartProduct } from '../cart_product/entities/cart_product.entity';
import { ProductRecipe } from '../product_recipe/entities/product_recipe.entity';
import { CreateCartProductDto } from './dto/create-cart_product.dto';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { MessageService } from '../common/lib';
export declare class CartProductService {
    readonly cartProductRepository: Repository<CartProduct>;
    readonly productRepository: Repository<Product>;
    readonly productRecipeRepository: Repository<ProductRecipe>;
    readonly userRepository: Repository<User>;
    readonly recipeRepository: Repository<Recipe>;
    private dataSource;
    private readonly messageService;
    constructor(cartProductRepository: Repository<CartProduct>, productRepository: Repository<Product>, productRecipeRepository: Repository<ProductRecipe>, userRepository: Repository<User>, recipeRepository: Repository<Recipe>, dataSource: DataSource, messageService: MessageService);
    create(createCartProductDto: CreateCartProductDto, req: any): Promise<{
        message: any;
    }>;
    update(id: number, createCartProductDto: CreateCartProductDto, req: any): Promise<{
        message: any;
    }>;
    findAll(req: any): Promise<any>;
    checkExist(id: number): Promise<any>;
    findOne(id: number): string;
    remove(id: number, req: any): Promise<{
        message: any;
    }>;
}
