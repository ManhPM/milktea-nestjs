import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { DataSource, Repository } from 'typeorm';
import { InvoiceProduct } from '../invoice_product/entities/invoice_product.entity';
import { CartProduct } from '../cart_product/entities/cart_product.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { User } from '../user/entities/user.entity';
import { Shop } from '../shop/entities/shop.entity';
import { Product } from '../product/entities/product.entity';
import { ShippingCompany } from '../shipping_company/entities/shipping_company.entity';
import { MessageService } from '../common/lib';
import { Recipe } from '../recipe/entities/recipe.entity';
export declare class InvoiceService {
    readonly invoiceRepository: Repository<Invoice>;
    readonly recipeRepository: Repository<Recipe>;
    readonly invoiceProductRepository: Repository<InvoiceProduct>;
    readonly ingredientRepository: Repository<Ingredient>;
    readonly cartProductRepository: Repository<CartProduct>;
    readonly userRepository: Repository<User>;
    readonly shopRepository: Repository<Shop>;
    readonly productRepository: Repository<Product>;
    readonly shippingCompanyRepository: Repository<ShippingCompany>;
    private dataSource;
    private readonly messageService;
    constructor(invoiceRepository: Repository<Invoice>, recipeRepository: Repository<Recipe>, invoiceProductRepository: Repository<InvoiceProduct>, ingredientRepository: Repository<Ingredient>, cartProductRepository: Repository<CartProduct>, userRepository: Repository<User>, shopRepository: Repository<Shop>, productRepository: Repository<Product>, shippingCompanyRepository: Repository<ShippingCompany>, dataSource: DataSource, messageService: MessageService);
    handlePayment(id_order: number, ip: any): Promise<{
        data: string;
    }>;
    handlePaymentReturn(vnp_Params: any): Promise<{
        message: any;
    }>;
    handleRefund(id_order: number, ip: any): Promise<{
        data: string;
    }>;
    handleRefundReturn(vnp_Params: any): Promise<{
        message: any;
    }>;
    sortObject(obj: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    findAll(query: any, req: any): Promise<any>;
    thongKe(query: any): Promise<any>;
    findOne(id: number): Promise<{
        data: {
            invoice: {};
            user: {
                phone: string;
                name: string;
                address: string;
            };
            products: {
                quantity: number;
                price: number;
                size: number;
                name: string;
                image: string;
                toppings: {
                    name: string;
                    image: string;
                    price: number;
                }[];
            }[];
        };
    }>;
    getCurrentInvoice(req: any): Promise<{
        data: {
            invoice: {
                id: number;
                total: number;
                shippingFee: number;
                date: string;
                status: number;
                paymentMethod: string;
                description: string;
                isPaid: number;
                shippingCompany: {};
            };
            user: {
                phone: string;
                name: string;
                address: string;
            };
            products: {
                quantity: number;
                size: number;
                name: string;
                image: string;
                toppings: {
                    name: string;
                    image: string;
                    price: number;
                }[];
            }[];
        };
    } | {
        data: Invoice;
    }>;
    checkout(item: CreateInvoiceDto, req: any): Promise<{
        data: {
            user: User;
            shippingCompany: ShippingCompany;
            total: number;
            shippingFee: number;
            paymentMethod: string;
            date: Date;
            status: number;
            isPaid: number;
            shippingCompanyId: number;
        } & Invoice;
        message: any;
    }>;
    confirmInvoice(id: number, req: any): Promise<{
        message: any;
    }>;
    cancelInvoice(id: number, req: any): Promise<{
        message: any;
    }>;
    receiveInvoice(id: number): Promise<{
        message: any;
    }>;
    completeInvoice(id: number): Promise<{
        message: any;
    }>;
    prepareInvoice(id: number): Promise<void>;
    checkExist(id: number): Promise<any>;
    handleAutoDeleteInvoice(): Promise<any>;
}
