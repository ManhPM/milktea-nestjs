import { Injectable, Request } from '@nestjs/common';
import { CreateUserCouponDto } from './dto/create-user_coupon.dto';
import { UpdateUserCouponDto } from './dto/update-user_coupon.dto';
import { UserCoupon } from './entities/user_coupon.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserCouponsService {
  constructor(
    @InjectRepository(UserCoupon)
    private userCouponRepository: Repository<UserCoupon>,
  ) {}

  async create(createUserCouponDto: CreateUserCouponDto) {
    await this.userCouponRepository.save(createUserCouponDto);
  }

  async findAll(userId: number) {
    const data = await this.userCouponRepository.find({
      where: {
        user: Like('%' + userId + '%'),
      },
      relations: ['coupon'],
    });
    return {
      data: data,
    };
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
