import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
import { ProductRecipe } from 'src/product_recipe/entities/product_recipe.entity';
import { FilterRecipeDto } from './dto/filter-recipe.dto';
import { RecipeType } from 'src/recipe_type/entities/recipe_type.entity';
import { Type } from 'src/type/entities/type.entity';
import { MessageService } from 'src/common/lib';

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
    private readonly messageService: MessageService,
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
      const message = await this.messageService.getMessage('CREATE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.recipeRepository.findOne({
        where: { id },
      });
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    try {
      await this.recipeRepository.update(id, {
        ...updateRecipeDto,
      });
      const message = await this.messageService.getMessage('UPDATE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.recipeRepository.update(id, {
        isActive: 0,
      });
      const message = await this.messageService.getMessage('DELETE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
