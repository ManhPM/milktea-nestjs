import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { FilterBookingDto } from './dto/filter-booking.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Khách hàng')
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'Nhân viên')
  @Get('/admin')
  findAllAdmin(@Query() query: FilterBookingDto) {
    return this.bookingsService.findAllAdmin(query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Khách hàng')
  @Get('')
  findAllUser(@Query() query: FilterBookingDto, @Request() req) {
    return this.bookingsService.findAllUser(query, req.user.userInfo.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'Nhân viên')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
