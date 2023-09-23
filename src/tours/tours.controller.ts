import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { FilterTourDto } from './dto/filter-tour.dto';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  // @Post()
  // create(@Body() createTourDto: CreateTourDto) {
  //   return this.toursService.create(createTourDto);
  // }

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
  //   return this.toursService.update(+id, updateTourDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
