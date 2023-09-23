import { Injectable } from '@nestjs/common';
import { CreateUserCouponDto } from './dto/create-user_coupon.dto';
import { UpdateUserCouponDto } from './dto/update-user_coupon.dto';

@Injectable()
export class UserCouponsService {
  create(createUserCouponDto: CreateUserCouponDto) {
    return 'This action adds a new userCoupon';
  }

  findAll() {
    return `This action returns all userCoupons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCoupon`;
  }

  update(id: number, updateUserCouponDto: UpdateUserCouponDto) {
    return `This action updates a #${id} userCoupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCoupon`;
  }
}
