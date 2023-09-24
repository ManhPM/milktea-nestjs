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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Khách hàng')
  @Post(':id')
  create(@Param('id') id: string, @Request() req) {
    return this.wishlistsService.create(+id, req.user.userInfo.id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Khách hàng')
  @Get()
  findAll(@Request() req) {
    return this.wishlistsService.findAll(req.user.userInfo.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistsService.remove(+id);
  }
}
