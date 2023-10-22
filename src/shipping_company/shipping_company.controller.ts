import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ShippingCompanyService } from './shipping_company.service';
import { CreateShippingCompanyDto } from './dto/create-shipping_company.dto';
import { UpdateShippingCompanyDto } from './dto/update-shipping_company.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetFeeShip } from './dto/getFeeShip.dto';

@Controller('shipping-company')
export class ShippingCompanyController {
  constructor(
    private readonly shippingCompanyService: ShippingCompanyService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Post()
  create(@Body() createShippingCompanyDto: CreateShippingCompanyDto) {
    return this.shippingCompanyService.create(createShippingCompanyDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateShippingCompanyDto: UpdateShippingCompanyDto,
  ) {
    return this.shippingCompanyService.update(id, updateShippingCompanyDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.shippingCompanyService.remove(id);
  }

  @Get('/feeship/:id')
  getFeeShip(@Param('id') id: number, @Query() query) {
    return this.shippingCompanyService.getFeeShip(id, query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getInfo(@Param() id: number) {
    return this.shippingCompanyService.getInfo(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.shippingCompanyService.findAll();
  }
}
