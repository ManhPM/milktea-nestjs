import { CreateInvoiceProductDto } from './dto/create-invoice_product.dto';
import { UpdateInvoiceProductDto } from './dto/update-invoice_product.dto';
import { InvoiceProduct } from './entities/invoice_product.entity';
import { Repository } from 'typeorm';
export declare class InvoiceProductService {
    readonly invoiceProductRepository: Repository<InvoiceProduct>;
    constructor(invoiceProductRepository: Repository<InvoiceProduct>);
    create(createInvoiceProductDto: CreateInvoiceProductDto): string;
    findAll(id: number): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateInvoiceProductDto: UpdateInvoiceProductDto): string;
    remove(id: number): string;
}
