import { Recipe } from '../../recipe/entities/recipe.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (item) => item.wishlists)
  user: User;

  @ManyToOne(() => Recipe, (item) => item.wishlists)
  recipe: Recipe;
}
