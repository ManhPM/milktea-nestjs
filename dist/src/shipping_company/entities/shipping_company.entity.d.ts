import { Invoice } from '../../invoice/entities/invoice.entity';
export declare class ShippingCompany {
    id: number;
    name: string;
    costPerKm: number;
    image: string;
    isActive: number;
    invoices: Invoice[];
}
