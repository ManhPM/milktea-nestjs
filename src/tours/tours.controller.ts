import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { FilterTourDto } from './dto/filter-tour.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }
  @Get('/search')
  getBySearch(@Query() query: FilterTourDto) {
    return this.toursService.search(query);
  }

  @Get()
  findAll(@Query() query: FilterTourDto) {
    return this.toursService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
