import { IsOptional, IsEmail } from 'class-validator';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UserCoupon } from 'src/user_coupons/entities/user_coupon.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column({ unique: true })
  username: string;

  @IsOptional()
  @IsEmail()
  @Column()
  email: string;

  @IsOptional()
  @Column()
  password: string;

  @IsOptional()
  @Column()
  fullName: string;

  @IsOptional()
  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @IsOptional()
  @Column()
  verifyID: number;

  @Column()
  photo: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlists: Wishlist[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.user)
  userCoupons: UserCoupon[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
