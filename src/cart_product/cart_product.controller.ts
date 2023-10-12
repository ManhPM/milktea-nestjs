import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartProductService } from './cart_product.service';
import { CreateCartProductDto } from './dto/create-cart_product.dto';
import { UpdateCartProductDto } from './dto/update-cart_product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('cart-product')
export class CartProductController {
  constructor(private readonly cartProductService: CartProductService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Post()
  create(@Body() createCartProductDto: CreateCartProductDto, @Request() req) {
    return this.cartProductService.create(createCartProductDto, req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Get()
  findAll(@Request() req) {
    return this.cartProductService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartProductService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCartProductDto: UpdateCartProductDto,
  ) {
    return this.cartProductService.update(req, +id, updateCartProductDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.cartProductService.remove(+id, req);
  }
}
