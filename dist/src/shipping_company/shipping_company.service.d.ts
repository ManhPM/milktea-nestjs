import { UpdateShippingCompanyDto } from './dto/update-shipping_company.dto';
import { Repository } from 'typeorm';
import { ShippingCompany } from './entities/shipping_company.entity';
import { CreateShippingCompanyDto } from './dto/create-shipping_company.dto';
import { Shop } from '../shop/entities/shop.entity';
import { MessageService } from '../common/lib';
export declare class ShippingCompanyService {
    readonly shippingCompanyRepository: Repository<ShippingCompany>;
    readonly shopRepository: Repository<Shop>;
    private readonly messageService;
    constructor(shippingCompanyRepository: Repository<ShippingCompany>, shopRepository: Repository<Shop>, messageService: MessageService);
    create(createShippingCompanyDto: CreateShippingCompanyDto): Promise<{
        message: any;
    }>;
    checkCreate(name: string, costPerKm: number): Promise<ShippingCompany>;
    update(id: number, updateShippingCompanyDto: UpdateShippingCompanyDto): Promise<{
        message: any;
    }>;
    remove(id: number): Promise<{
        message: any;
    }>;
    checkExist(id: number): Promise<any>;
    findAll(): Promise<{
        data: ShippingCompany[];
    }>;
    getInfo(id: number): Promise<{
        data: ShippingCompany;
    }>;
    getFeeShip(id: number, query: any): Promise<{
        data: number;
        distance: number;
    }>;
}
