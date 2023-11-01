import { InvoiceProductService } from './invoice_product.service';
import { CreateInvoiceProductDto } from './dto/create-invoice_product.dto';
import { UpdateInvoiceProductDto } from './dto/update-invoice_product.dto';
export declare class InvoiceProductController {
    private readonly invoiceProductService;
    constructor(invoiceProductService: InvoiceProductService);
    create(createInvoiceProductDto: CreateInvoiceProductDto): string;
    findAll(id: string): Promise<any>;
    update(id: string, updateInvoiceProductDto: UpdateInvoiceProductDto): string;
    remove(id: string): string;
}
