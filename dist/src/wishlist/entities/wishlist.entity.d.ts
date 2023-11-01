import { Recipe } from '../../recipe/entities/recipe.entity';
import { User } from '../../user/entities/user.entity';
export declare class Wishlist {
    id: number;
    user: User;
    recipe: Recipe;
}
