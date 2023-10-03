import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RecipeIngredientService } from './recipe_ingredient.service';
import { CreateRecipeIngredientDto } from './dto/create-recipe_ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe_ingredient.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { DeleteRecipeIngredientDto } from './dto/delete-recipe_ingredient.dto';

@Controller('recipe-ingredient')
export class RecipeIngredientController {
  constructor(
    private readonly recipeIngredientService: RecipeIngredientService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Post()
  create(@Body() createRecipeIngredientDto: CreateRecipeIngredientDto) {
    return this.recipeIngredientService.create(createRecipeIngredientDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Get(':id')
  findAll(@Param('id') id: number) {
    return this.recipeIngredientService.findAll(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeIngredientService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Patch()
  update(@Body() updateRecipeIngredientDto: UpdateRecipeIngredientDto) {
    return this.recipeIngredientService.update(updateRecipeIngredientDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Delete()
  remove(@Body() item: DeleteRecipeIngredientDto) {
    return this.recipeIngredientService.remove(item);
  }
}
