import { IsOptional, IsUrl, IsPositive } from 'class-validator';
import { Tour } from 'src/tours/entities/tour.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column()
  comment: string;

  @IsUrl()
  @Column()
  photo: string;

  @IsOptional()
  @CreateDateColumn()
  created_at: Date;

  @IsOptional()
  @IsPositive()
  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Tour, (tour) => tour.reviews)
  tour: Tour;
}
