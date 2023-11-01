import { Invoice } from '../../invoice/entities/invoice.entity';
import { Product } from '../../product/entities/product.entity';
export declare class InvoiceProduct {
    id: number;
    size: number;
    quantity: number;
    price: number;
    isReviewed: number;
    invoice: Invoice;
    product: Product;
}
