import { WishlistService } from './wishlist.service';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    create(id: number, req: any): Promise<{
        message: any;
    }>;
    findAll(req: any): Promise<any>;
}
