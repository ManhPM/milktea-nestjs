import { Account } from '../../account/entities/account.entity';
import { CartProduct } from '../../cart_product/entities/cart_product.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Review } from '../../review/entities/review.entity';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';
export declare class User {
    id: number;
    name: string;
    address: string;
    photo: string;
    cart_products: CartProduct[];
    account: Account;
    invoices: Invoice[];
    wishlists: Wishlist[];
    reviews: Review[];
}
