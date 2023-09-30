import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RecipeTypeService } from './recipe_type.service';
import { CreateRecipeTypeDto } from './dto/create-recipe_type.dto';
import { DeleteRecipeTypeDto } from './dto/delete-recipe_type.dto';

@Controller('recipe-type')
export class RecipeTypeController {
  constructor(private readonly recipeTypeService: RecipeTypeService) {}

  @Post()
  create(@Body() createRecipeTypeDto: CreateRecipeTypeDto) {
    return this.recipeTypeService.create(createRecipeTypeDto);
  }

  @Get()
  findAll() {
    return this.recipeTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeTypeService.findOne(+id);
  }

  @Delete()
  remove(@Body() item: DeleteRecipeTypeDto) {
    return this.recipeTypeService.remove(item);
  }
}
