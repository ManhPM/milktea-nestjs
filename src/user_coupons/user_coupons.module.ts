import { Module } from '@nestjs/common';
import { UserCouponsService } from './user_coupons.service';
import { UserCouponsController } from './user_coupons.controller';
import { UserCoupon } from './entities/user_coupon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserCoupon])],
  controllers: [UserCouponsController],
  providers: [UserCouponsService],
})
export class UserCouponsModule {}
