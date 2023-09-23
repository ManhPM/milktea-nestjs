import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCouponsService } from './user_coupons.service';
import { CreateUserCouponDto } from './dto/create-user_coupon.dto';
import { UpdateUserCouponDto } from './dto/update-user_coupon.dto';

@Controller('user-coupons')
export class UserCouponsController {
  constructor(private readonly userCouponsService: UserCouponsService) {}

  @Post()
  create(@Body() createUserCouponDto: CreateUserCouponDto) {
    return this.userCouponsService.create(createUserCouponDto);
  }

  @Get()
  findAll() {
    return this.userCouponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCouponsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserCouponDto: UpdateUserCouponDto) {
    return this.userCouponsService.update(+id, updateUserCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCouponsService.remove(+id);
  }
}
