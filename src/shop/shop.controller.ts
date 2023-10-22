import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Patch()
  update(@Body() item: UpdateShopDto) {
    return this.shopService.update(item);
  }
}
