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
import { WishlistService } from './wishlist.service';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Post(':id')
  create(@Param('id') id: number, @Request() req) {
    return this.wishlistService.create(id, req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Get()
  findAll(@Request() req) {
    return this.wishlistService.findAll(req);
  }
}
