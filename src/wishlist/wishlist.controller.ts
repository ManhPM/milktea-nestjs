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
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistService.update(+id, updateWishlistDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(+id);
  }
}
