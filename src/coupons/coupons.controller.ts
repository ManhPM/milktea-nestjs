import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(+id, updateCouponDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(+id);
  }
}
