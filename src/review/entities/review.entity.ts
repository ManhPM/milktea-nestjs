import { Recipe } from 'src/recipe/entities/recipe.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  comment: string;

  @Column()
  date: Date;

  @Column()
  rating: number;

  @Column()
  image: string;

  @ManyToOne(() => User, (item) => item.reviews)
  user: User;

  @ManyToOne(() => Recipe, (item) => item.wishlists)
  recipe: Recipe;
}
