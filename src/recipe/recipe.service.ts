import { HttpException, Injectable } from '@nestjs/common';
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
  async create(createRecipeDto: CreateRecipeDto) {
    try {
      createRecipeDto.discount = 0;
      if (!createRecipeDto.image) {
        createRecipeDto.image =
          'https://phuclong.com.vn/uploads/dish/063555c21c4206-trviliphclong.png';
      }
      if (!createRecipeDto.info) {
        createRecipeDto.info = 'Mặc định';
      }
      createRecipeDto.isActive = 1;
      const type = await this.typeRepository.findOne({
        where: {
          id: createRecipeDto.typeId,
        },
      });
      await this.recipeRepository.save({
        ...createRecipeDto,
        type,
      });
      return {
        message: 'Tạo mới thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi tạo mới công thức',
          error: error.message,
        },
        500,
      );
    }
  }

  async getAllRecipe(query: FilterRecipeDto): Promise<any> {
    try {
      const keyword = query.keyword || undefined;
      let res = [];
      if (keyword) {
        res = await this.recipeRepository.find({
          where: {
            type: Not(5),
            name: Like('%' + keyword + '%'),
            isActive: Not(0),
          },
          relations: ['type'],
        });
      } else {
        res = await this.recipeRepository.find({
          where: {
            type: Not(5),
            isActive: Not(0),
          },
          relations: ['type'],
        });
      }
      return {
        data: res,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách công thức',
          error: error.message,
        },
        500,
      );
    }
  }

  async getRecipeByType(id: number) {
    try {
      const [res, total] = await this.recipeRepository.findAndCount({
        where: {
          type: Like('%' + id + '%'),
        },
      });
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách công thức theo loại hàng',
          error: error.message,
        },
        500,
      );
    }
  }

  async getToppingOfType(id: number) {
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách topping theo loại hàng',
          error: error.message,
        },
        500,
      );
    }
  }

  async getAllTopping() {
    try {
      const [res, total] = await this.recipeRepository.findAndCount({
        where: {
          type: Like('%' + 5 + '%'),
        },
      });
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách topping',
          error: error.message,
        },
        500,
      );
    }
  }

  async getAllIngredientOfRecipe(id: number) {
    try {
      const res = await this.recipeRepository.findOne({
        where: {
          id: id,
        },
        relations: ['recipe_inredients.ingredient'],
      });
      return {
        data: res,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách nguyên liệu theo công thức',
          error: error.message,
        },
        500,
      );
    }
  }

  async getToppingByRecipe(id: number) {
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách topping theo công thức',
          error: error.message,
        },
        500,
      );
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.recipeRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra tồn tại công thức',
          error: error.message,
        },
        500,
      );
    }
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    try {
      await this.recipeRepository.update(id, {
        ...updateRecipeDto,
      });
      return {
        message: 'Cập nhật thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi cập nhật công thức',
          error: error.message,
        },
        500,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.recipeRepository.update(id, {
        isActive: 0,
      });
      return {
        message: 'Xoá thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi xoá công thức',
          error: error.message,
        },
        500,
      );
    }
  }
}
