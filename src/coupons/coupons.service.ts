import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  async findAll(): Promise<any> {
    const [res, total] = await this.couponRepository.findAndCount({});
    return {
      data: res,
      total,
    };
  }

  create(createCouponDto: CreateCouponDto) {
    return 'This action adds a new coupon';
  }

  async findOne(id: number): Promise<Coupon> {
    return await this.couponRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
