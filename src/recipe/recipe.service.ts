import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
import { ProductRecipe } from '../product_recipe/entities/product_recipe.entity';
import { FilterRecipeDto } from './dto/filter-recipe.dto';
import { RecipeType } from '../recipe_type/entities/recipe_type.entity';
import { Type } from '../type/entities/type.entity';
import { MessageService } from '../common/lib';
import { Wishlist } from '../wishlist/entities/wishlist.entity';

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
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getDetailRecipe(id: number, @Request() req): Promise<any> {
    try {
      const res = await this.recipeRepository.findOne({
        where: {
          id: id,
        },
        relations: ['recipe_ingredients.ingredient', 'type'],
      });
      if (res) {
        const data = {
          id: res.id,
          name: res.name,
          info: res.info,
          image: res.image,
          isActive: res.isActive,
          price: res.price,
          discount: res.discount,
          type: res.type.id,
          ingredients: [],
          isLiked: 0,
        };
        for (let i = 0; i < res.recipe_ingredients.length; i++) {
          data.ingredients[i] = res.recipe_ingredients[i].ingredient;
          data.ingredients[i].remainQuantity =
            res.recipe_ingredients[i].ingredient.quantity;
          data.ingredients[i].quantity = res.recipe_ingredients[i].quantity;
        }
        const wishlist = await this.wishlistRepository.find({
          where: {
            user: Like(req.query.id),
          },
          relations: ['recipe'],
        });
        let wishlistIds;
        if (wishlist[0]) {
          wishlistIds = wishlist.map((item) => item.recipe.id);
        }
        data.isLiked = wishlistIds.includes(data.id) ? 1 : 0;
        return {
          data: data,
        };
      }
      return {
        data: res,
      };
    } catch (error) {
      console.log(error);
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
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
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getRecipeByType(id: number, @Request() req) {
    try {
      const res1 = await this.recipeRepository.find({
        where: {
          type: Like(id),
          isActive: Like(1),
        },
      });
      const res2 = await this.recipeRepository.find({
        where: {
          type: Like(id),
          isActive: Like(2),
        },
      });
      const res0 = await this.recipeRepository.find({
        where: {
          type: Like(id),
          isActive: Like(0),
        },
      });
      const res = [...res1, ...res2, ...res0];
      const wishlist = await this.wishlistRepository.find({
        where: {
          user: Like(req.query.id),
        },
        relations: ['recipe'],
      });
      if (wishlist[0] && res[0]) {
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
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getToppingByType(id: number) {
    try {
      const [res, total] = await this.recipeTypeRepository.findAndCount({
        where: {
          type: Like(id),
        },
        relations: ['recipe'],
      });

      if (res[0]) {
        const data = [{}];
        let j = 0;
        for (let i = 0; i < res.length; i++) {
          if (res[i].recipe.isActive != 0) {
            data[j] = res[i].recipe;
            j++;
          }
        }
        return {
          data: data,
        };
      }
      return {
        data: null,
      };
    } catch (error) {
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
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
        let j = 0;
        for (let i = 0; i < res.type.recipe_types.length; i++) {
          if (res.type.recipe_types[i].recipe.isActive != 0) {
            data[j] = res.type.recipe_types[i].recipe;
            j++;
          }
        }
        return {
          data: data,
        };
      }
      return {
        data: null,
      };
    } catch (error) {
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getAllTopping() {
    try {
      const [res, total] = await this.recipeRepository.findAndCount({
        where: {
          type: Like(5),
          isActive: Not(0),
        },
      });
      return {
        data: res,
        total,
      };
    } catch (error) {
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
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
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.recipeRepository.findOne({
        where: { id },
      });
    } catch (error) {
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    try {
      const type = await this.typeRepository.findOne({
        where: {
          id: updateRecipeDto.typeId,
        },
      });
      const recipe = await this.recipeRepository.findOne({
        where: {
          id: id,
        },
        relations: ['type'],
      });
      await this.recipeRepository.update(id, {
        name: updateRecipeDto.name ? updateRecipeDto.name : recipe.name,
        info: updateRecipeDto.info ? updateRecipeDto.info : recipe.info,
        image: updateRecipeDto.image ? updateRecipeDto.image : recipe.image,
        price: updateRecipeDto.price ? updateRecipeDto.price : recipe.price,
        discount: updateRecipeDto.discount
          ? updateRecipeDto.discount
          : recipe.discount,
      });
      if (type) {
        await this.recipeRepository.update(id, {
          type: type,
        });
      }
      const message = await this.messageService.getMessage('UPDATE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async remove(id: number) {
    try {
      const recipe = await this.recipeRepository.findOne({
        where: {
          id: id,
        },
      });
      if (recipe) {
        if (recipe.isActive != 0) {
          await this.recipeRepository.update(id, {
            isActive: 0,
          });
          const message =
            await this.messageService.getMessage('DELETE_SUCCESS');
          return {
            message: message,
          };
        } else {
          await this.recipeRepository.update(id, {
            isActive: 1,
          });
          const message = await this.messageService.getMessage(
            'UNDELETE_RECIPE_SUCCESS',
          );
          return {
            message: message,
          };
        }
      } else {
        throw new HttpException(
          {
            messageCode: 'RECIPE_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
