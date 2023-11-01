import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
export declare class CartProduct {
    id: number;
    size: number;
    quantity: number;
    user: User;
    product: Product;
}
