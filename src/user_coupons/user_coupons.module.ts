import { Module } from '@nestjs/common';
import { UserCouponsService } from './user_coupons.service';
import { UserCouponsController } from './user_coupons.controller';

@Module({
  controllers: [UserCouponsController],
  providers: [UserCouponsService],
})
export class UserCouponsModule {}
