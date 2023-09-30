import { Injectable } from '@nestjs/common';
import { CreateRecipeIngredientDto } from './dto/create-recipe_ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe_ingredient.dto';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeIngredientService {
  constructor(
    @InjectRepository(RecipeIngredient)
    readonly recipeIngredientRepository: Repository<RecipeIngredient>,
  ) {}
  create(createRecipeIngredientDto: CreateRecipeIngredientDto) {
    return 'This action adds a new recipeIngredient';
  }

  async findAll(): Promise<any> {
    const [res, total] = await this.recipeIngredientRepository.findAndCount({
      relations: ['recipe', 'ingredient'],
    });
    return {
      data: res,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} recipeIngredient`;
  }

  update(id: number, updateRecipeIngredientDto: UpdateRecipeIngredientDto) {
    return `This action updates a #${id} recipeIngredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipeIngredient`;
  }
}
