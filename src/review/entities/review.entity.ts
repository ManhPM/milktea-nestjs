import { Recipe } from '../../recipe/entities/recipe.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
