import { IsOptional, IsPositive } from 'class-validator';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserCoupon {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column()
  expireDate: Date;

  @IsOptional()
  @IsPositive()
  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.userCoupons)
  user: User;

  @ManyToOne(() => Coupon, (coupon) => coupon.usercoupons)
  coupon: Coupon;
}
