import { ShopService } from './shop.service';
import { UpdateShopDto } from './dto/update-shop.dto';
export declare class ShopController {
    private readonly shopService;
    constructor(shopService: ShopService);
    findAll(): Promise<any>;
    update(item: UpdateShopDto): Promise<{
        message: any;
    }>;
}
