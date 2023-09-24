import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserCouponsService } from './user_coupons.service';
import { CreateUserCouponDto } from './dto/create-user_coupon.dto';
import { UpdateUserCouponDto } from './dto/update-user_coupon.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user-coupons')
export class UserCouponsController {
  constructor(private readonly userCouponsService: UserCouponsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  create(@Body() createUserCouponDto: CreateUserCouponDto) {
    return this.userCouponsService.create(createUserCouponDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Khách hàng', 'Admin')
  @Get()
  findAll(@Request() req) {
    return this.userCouponsService.findAll(req.user.userInfo.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCouponsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCouponDto: UpdateUserCouponDto,
  ) {
    return this.userCouponsService.update(+id, updateUserCouponDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCouponsService.remove(+id);
  }
}
