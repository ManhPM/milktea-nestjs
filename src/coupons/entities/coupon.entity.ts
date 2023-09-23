import { IsOptional, IsPositive, MaxLength } from 'class-validator';
import { UserCoupon } from 'src/user_coupons/entities/user_coupon.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column({ unique: true })
  couponCode: string;

  @IsOptional()
  @IsPositive()
  @Column()
  discountPercentage: number;

  @IsOptional()
  @Column()
  @MaxLength(2500)
  description: string;

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.coupon)
  usercoupons: UserCoupon[];
}
