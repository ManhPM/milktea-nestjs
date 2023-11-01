import { CartProduct } from '../../cart_product/entities/cart_product.entity';
import { InvoiceProduct } from '../../invoice_product/entities/invoice_product.entity';
import { ProductRecipe } from '../../product_recipe/entities/product_recipe.entity';
export declare class Product {
    id: number;
    size: number;
    productString: string;
    cart_products: CartProduct[];
    invoice_products: InvoiceProduct[];
    product_recipes: ProductRecipe[];
}
