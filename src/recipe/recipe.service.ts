import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
import { ProductRecipe } from 'src/product_recipe/entities/product_recipe.entity';
import { FilterRecipeDto } from './dto/filter-recipe.dto';
import { RecipeType } from 'src/recipe_type/entities/recipe_type.entity';
import { Type } from 'src/type/entities/type.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(ProductRecipe)
    readonly productRecipeRepository: Repository<ProductRecipe>,
    @InjectRepository(RecipeType)
    readonly recipeTypeRepository: Repository<RecipeType>,
    @InjectRepository(Type)
    readonly typeRepository: Repository<Type>,
  ) {}
  create(createRecipeDto: CreateRecipeDto) {
    return 'This action adds a new recipe';
  }

  async getAllRecipe(query: FilterRecipeDto): Promise<any> {
    const keyword = query.keyword || undefined;
    let res = [];
    if (keyword) {
      res = await this.recipeRepository.find({
        where: {
          type: Not(5),
          name: Like('%' + keyword + '%'),
        },
        relations: ['type'],
      });
    } else {
      res = await this.recipeRepository.find({
        where: {
          type: Not(5),
        },
        relations: ['type'],
      });
    }
    return {
      data: res,
    };
  }

  async getRecipeByType(id: number) {
    const [res, total] = await this.recipeRepository.findAndCount({
      where: {
        type: Like('%' + id + '%'),
      },
    });
    return {
      data: res,
      total,
    };
  }

  async getToppingOfType(id: number) {
    const [res, total] = await this.recipeTypeRepository.findAndCount({
      where: {
        type: Like('%' + id + '%'),
      },
      relations: ['recipe'],
    });
    return {
      data: res,
      total,
    };
  }

  async getAllTopping() {
    const [res, total] = await this.recipeRepository.findAndCount({
      where: {
        type: Like('%' + 5 + '%'),
      },
    });
    return {
      data: res,
      total,
    };
  }

  async getToppingByRecipe(id: number) {
    const [res, total] = await this.productRecipeRepository.findAndCount({
      where: {
        product: Like('%' + id + '%'),
      },
      relations: ['recipe', 'product'],
    });
    return {
      data: res,
      total,
    };
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
