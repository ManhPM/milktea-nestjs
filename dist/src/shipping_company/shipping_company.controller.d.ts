import { ShippingCompanyService } from './shipping_company.service';
import { CreateShippingCompanyDto } from './dto/create-shipping_company.dto';
import { UpdateShippingCompanyDto } from './dto/update-shipping_company.dto';
export declare class ShippingCompanyController {
    private readonly shippingCompanyService;
    constructor(shippingCompanyService: ShippingCompanyService);
    create(createShippingCompanyDto: CreateShippingCompanyDto): Promise<{
        message: any;
    }>;
    update(id: number, updateShippingCompanyDto: UpdateShippingCompanyDto): Promise<{
        message: any;
    }>;
    remove(id: number): Promise<{
        message: any;
    }>;
    getFeeShip(id: number, query: any): Promise<{
        data: number;
        distance: number;
    }>;
    getInfo(id: number): Promise<{
        data: import("./entities/shipping_company.entity").ShippingCompany;
    }>;
    findAll(): Promise<{
        data: import("./entities/shipping_company.entity").ShippingCompany[];
    }>;
}
