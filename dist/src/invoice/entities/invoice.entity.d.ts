import { InvoiceProduct } from '../../invoice_product/entities/invoice_product.entity';
import { ShippingCompany } from '../../shipping_company/entities/shipping_company.entity';
import { Staff } from '../../staff/entities/staff.entity';
import { User } from '../../user/entities/user.entity';
export declare class Invoice {
    id: number;
    total: number;
    shippingFee: number;
    date: Date;
    status: number;
    paymentMethod: string;
    description: string;
    isPaid: number;
    user: User;
    staff: Staff;
    shippingCompany: ShippingCompany;
    invoice_products: InvoiceProduct[];
}
