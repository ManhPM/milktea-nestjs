import { Recipe } from '../../recipe/entities/recipe.entity';
import { User } from '../../user/entities/user.entity';
export declare class Review {
    id: number;
    comment: string;
    date: Date;
    rating: number;
    image: string;
    user: User;
    recipe: Recipe;
}
