import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { MessageService } from '../common/lib';
export declare class ShopService {
    readonly shopRepository: Repository<Shop>;
    private readonly messageService;
    constructor(shopRepository: Repository<Shop>, messageService: MessageService);
    create(createShopDto: CreateShopDto): string;
    checkExist(id: number): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): string;
    update(item: UpdateShopDto): Promise<{
        message: any;
    }>;
    remove(id: number): string;
}
