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
  @Get()
  findAll() {
    return this.recipeIngredientService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeIngredientService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipeIngredientDto: UpdateRecipeIngredientDto,
  ) {
    return this.recipeIngredientService.update(+id, updateRecipeIngredientDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeIngredientService.remove(+id);
  }
}
