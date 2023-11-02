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
  Request,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { FilterRecipeDto } from './dto/filter-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get('/menu')
  findAll(@Query() query: FilterRecipeDto) {
    return this.recipeService.getAllRecipe(query);
  }

  @Get('/menu/:id')
  getRecipeByType(@Param('id') id: string, @Request() req) {
    return this.recipeService.getRecipeByType(+id, req);
  }

  @Get(':id')
  getDetail(@Param('id') id: string, @Request() req) {
    return this.recipeService.getDetailRecipe(+id, req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get('/ingredient/:id')
  getAllIngredientOfRecipe(@Param('id') id: string) {
    return this.recipeService.getAllIngredientOfRecipe(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Get('/topping')
  getAllTopping() {
    return this.recipeService.getAllTopping();
  }

  @Get('/type-topping/:id')
  getToppingByType(@Param('id') id: string) {
    return this.recipeService.getToppingByType(+id);
  }

  @Get('/recipe-topping/:id')
  getToppingByRecipe(@Param('id') id: string) {
    return this.recipeService.getToppingByRecipe(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
