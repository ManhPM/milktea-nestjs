import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
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
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(ProductRecipe)
    readonly productRecipeRepository: Repository<ProductRecipe>,
    @InjectRepository(RecipeType)
    readonly recipeTypeRepository: Repository<RecipeType>,
    @InjectRepository(Wishlist)
    readonly wishlistRepository: Repository<Wishlist>,
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

  async getDetailRecipe(id: number): Promise<any> {
    try {
      const res = await this.recipeRepository.findOne({
        where: {
          id: id,
        },
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

  async getAllRecipe(query: FilterRecipeDto): Promise<any> {
    try {
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

  async getRecipeByType(id: number, @Request() req) {
    try {
      const res = await this.recipeRepository.find({
        where: {
          type: Like('%' + id + '%'),
        },
      });
      const wishlist = await this.wishlistRepository.find({
        where: {
          user: Like('%' + req.query.id + '%'),
        },
        relations: ['recipe'],
      });
      if (wishlist[0]) {
        let wishlistIds;
        if (wishlist[0]) {
          wishlistIds = wishlist.map((item) => item.recipe.id);
        }
        const newData = res.map((item) => {
          return {
            ...item,
            isLiked: wishlistIds.includes(item.id) ? 1 : 0,
          };
        });
        return {
          data: newData,
        };
      }
      const newData = res.map((item) => {
        return {
          ...item,
          isLiked: 0,
        };
      });
      return {
        data: newData,
      };
    } catch (error) {
      console.log(error);
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

  async getToppingByType(id: number) {
    try {
      const [res, total] = await this.recipeTypeRepository.findAndCount({
        where: {
          type: Like('%' + id + '%'),
        },
        relations: ['recipe'],
      });

      if (res[0]) {
        const data = [{}];
        for (let i = 0; i < res.length; i++) {
          data[i] = res[i].recipe;
        }
        return {
          data: data,
        };
      }
      return {
        data: null,
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
      const res = await this.recipeRepository.findOne({
        where: {
          id: id,
        },
        relations: ['type.recipe_types.recipe'],
      });
      if (res) {
        const data = [{}];
        for (let i = 0; i < res.type.recipe_types.length; i++) {
          data[i] = res.type.recipe_types[i].recipe;
        }
        return {
          data: data,
        };
      }
      return {
        data: null,
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
        relations: ['recipe_ingredients.ingredient'],
      });
      if (res) {
        const data = [{}];
        for (let i = 0; i < res.recipe_ingredients.length; i++) {
          data[i] = res.recipe_ingredients[i];
        }
        return {
          data: data,
        };
      }
      return {
        data: null,
      };
    } catch (error) {
      console.log(error);
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
