import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RecipeTypeService } from './recipe_type.service';
import { CreateRecipeTypeDto } from './dto/create-recipe_type.dto';
import { DeleteRecipeTypeDto } from './dto/delete-recipe_type.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('recipe-type')
export class RecipeTypeController {
  constructor(private readonly recipeTypeService: RecipeTypeService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Post()
  create(@Body() createRecipeTypeDto: CreateRecipeTypeDto) {
    return this.recipeTypeService.create(createRecipeTypeDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Get(':id')
  findAll(@Param('id') id: number) {
    return this.recipeTypeService.findAll(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeTypeService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Delete()
  remove(@Body() item: DeleteRecipeTypeDto) {
    return this.recipeTypeService.remove(item);
  }
}
