import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { FilterIngredientDto } from './dto/filter-ingredient.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get()
  findAll(@Query() query: FilterIngredientDto) {
    return this.ingredientService.findAll(query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientService.update(+id, updateIngredientDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(+id);
  }
}
