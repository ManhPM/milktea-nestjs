import { CartProductService } from './cart_product.service';
import { CreateCartProductDto } from './dto/create-cart_product.dto';
export declare class CartProductController {
    private readonly cartProductService;
    constructor(cartProductService: CartProductService);
    create(createCartProductDto: CreateCartProductDto, req: any): Promise<{
        message: any;
    }>;
    findAll(req: any): Promise<any>;
    findOne(id: string): string;
    update(req: any, id: string, item: CreateCartProductDto): Promise<{
        message: any;
    }>;
    remove(id: string, req: any): Promise<{
        message: any;
    }>;
}
