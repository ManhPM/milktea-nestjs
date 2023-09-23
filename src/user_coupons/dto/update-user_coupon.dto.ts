import { PartialType } from '@nestjs/swagger';
import { CreateUserCouponDto } from './create-user_coupon.dto';

export class UpdateUserCouponDto extends PartialType(CreateUserCouponDto) {}
