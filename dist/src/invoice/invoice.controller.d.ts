import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    create(createInvoiceDto: CreateInvoiceDto, req: any): Promise<{
        data: {
            user: import("../user/entities/user.entity").User;
            shippingCompany: import("../shipping_company/entities/shipping_company.entity").ShippingCompany;
            total: number;
            shippingFee: number;
            paymentMethod: string;
            date: Date;
            status: number;
            isPaid: number;
            shippingCompanyId: number;
        } & import("./entities/invoice.entity").Invoice;
        message: any;
    }>;
    findAll(query: any, req: any): Promise<any>;
    findOne(id: string): Promise<{
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
    statistical(query: any): Promise<any>;
    handlePayment(id_order: number, ip: any): Promise<{
        data: string;
    }>;
    handleRefund(id_order: number, ip: any): Promise<{
        data: string;
    }>;
    handleAccessPayment(vnp_Params: any): Promise<{
        message: any;
    }>;
    handleRefundReturn(vnp_Params: any): Promise<{
        message: any;
    }>;
    getCurrent(req: any): Promise<{
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
        data: import("./entities/invoice.entity").Invoice;
    }>;
    confirm(id: number, req: any): Promise<{
        message: any;
    }>;
    receive(id: number): Promise<{
        message: any;
    }>;
    cancel(id: number, req: any): Promise<{
        message: any;
    }>;
    complete(id: number): Promise<{
        message: any;
    }>;
    prepare(id: number): Promise<void>;
    autoDelete(): () => Promise<any>;
}
