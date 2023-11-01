import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { MessageService } from '../common/lib';
export declare class WishlistService {
    readonly wishlistRepository: Repository<Wishlist>;
    readonly userRepository: Repository<User>;
    readonly recipeRepository: Repository<Recipe>;
    private readonly messageService;
    constructor(wishlistRepository: Repository<Wishlist>, userRepository: Repository<User>, recipeRepository: Repository<Recipe>, messageService: MessageService);
    create(id: number, req: any): Promise<{
        message: any;
    }>;
    findAll(req: any): Promise<any>;
    update(id: number, updateWishlistDto: UpdateWishlistDto): string;
    remove(id: number): string;
}
