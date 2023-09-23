import { Booking } from 'src/bookings/entities/booking.entity';
import { IsOptional, IsPositive, MaxLength } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { Guide } from 'src/guides/entities/guide.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column()
  tourName: string;

  @IsOptional()
  @Column()
  @MaxLength(2500)
  itineraries: string;

  @IsOptional()
  @Column()
  address: string;

  @IsOptional()
  @Column()
  duration: string;

  @IsOptional()
  @Column()
  photo: string;

  @IsOptional()
  @Column()
  startDate: Date;

  @IsOptional()
  @Column({ nullable: false })
  endDate: Date;

  @IsOptional()
  @Column()
  price: number;

  @IsOptional()
  @Column()
  discount: number;

  @Column()
  @MaxLength(2500)
  description: string;

  @IsOptional()
  @IsPositive()
  @Column()
  availableSeats: number;

  @IsPositive()
  @IsOptional()
  @Column()
  maxSeats: number;

  @IsOptional()
  @Column()
  status: number;

  @IsOptional()
  @Column()
  featured: boolean;

  @ManyToOne(() => Category, (category) => category.tours)
  category: Category;

  @ManyToOne(() => Guide, (guide) => guide.tours)
  guide: Guide;

  @OneToMany(() => Booking, (booking) => booking.tour)
  bookings: Booking[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.tour)
  wishlists: Wishlist[];

  @OneToMany(() => Review, (review) => review.tour)
  reviews: Review[];
}
