import { HttpException, Injectable } from '@nestjs/common';
import { CreateRecipeIngredientDto } from './dto/create-recipe_ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe_ingredient.dto';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DeleteRecipeIngredientDto } from './dto/delete-recipe_ingredient.dto';

@Injectable()
export class RecipeIngredientService {
  constructor(
    @InjectRepository(RecipeIngredient)
    readonly recipeIngredientRepository: Repository<RecipeIngredient>,
  ) {}
  async create(item: CreateRecipeIngredientDto) {
    try {
      await this.recipeIngredientRepository.save({
        ...item,
      });
      return {
        message: 'Tạo mới thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi tạo mới nguyên liệu cho công thức',
          error: error.message,
        },
        500,
      );
    }
  }

  async findAll(id: number): Promise<any> {
    try {
      const [res, total] = await this.recipeIngredientRepository.findAndCount({
        where: {
          recipe: Like('%' + id + '%'),
        },
        relations: ['recipe', 'ingredient'],
      });
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách nguyên liệu cho công thức',
          error: error.message,
        },
        500,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} recipeIngredient`;
  }

  async update(item: UpdateRecipeIngredientDto) {
    try {
      const recipeIngredient = await this.recipeIngredientRepository.findOne({
        where: {
          recipe: Like('%' + item.recipeId + '%'),
          ingredient: Like('%' + item.ingredientId + '%'),
        },
      });
      await this.recipeIngredientRepository.update(recipeIngredient.id, {
        quantity: item.quantity,
      });
      return {
        message: 'Cập nhật thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi cập nhật nguyên liệu cho công thức',
          error: error.message,
        },
        500,
      );
    }
  }

  async remove(item: DeleteRecipeIngredientDto) {
    try {
      await this.recipeIngredientRepository.delete({
        recipe: Like('%' + item.recipeId + '%'),
        ingredient: Like('%' + item.ingredientId + '%'),
      });
      return {
        message: 'Xoá thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi xoá nguyên liệu cho công thức',
          error: error.message,
        },
        500,
      );
    }
  }
}
