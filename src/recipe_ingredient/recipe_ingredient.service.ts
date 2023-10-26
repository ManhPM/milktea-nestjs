import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipeIngredientDto } from './dto/create-recipe_ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe_ingredient.dto';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DeleteRecipeIngredientDto } from './dto/delete-recipe_ingredient.dto';
import { MessageService } from '../common/lib';
import { Recipe } from '../recipe/entities/recipe.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';

@Injectable()
export class RecipeIngredientService {
  constructor(
    @InjectRepository(RecipeIngredient)
    readonly recipeIngredientRepository: Repository<RecipeIngredient>,
    @InjectRepository(Recipe)
    readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    readonly ingredientRepository: Repository<Ingredient>,
    private readonly messageService: MessageService,
  ) {}
  async create(item: CreateRecipeIngredientDto) {
    try {
      if (!item.ingredientId) {
        throw new HttpException(
          {
            messageCode: 'INPUT_INGREDIENT_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (!item.recipeId) {
        throw new HttpException(
          {
            messageCode: 'INPUT_RECIPE_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (!item.quantity) {
        throw new HttpException(
          {
            messageCode: 'INPUT_QUANTITY_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const ingredient = await this.ingredientRepository.findOne({
        where: {
          id: item.ingredientId,
        },
      });
      const recipe = await this.recipeRepository.findOne({
        where: {
          id: item.recipeId,
        },
      });
      if (!recipe) {
        throw new HttpException(
          {
            messageCode: 'RECIPE_NOTFOUND',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (!ingredient) {
        throw new HttpException(
          {
            messageCode: 'INGREDIENT_NOTFOUND',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const check = await this.recipeIngredientRepository.findOne({
        where: {
          ingredient: Like(item.ingredientId),
          recipe: Like(item.recipeId),
        },
      });
      if (check) {
        await this.recipeIngredientRepository.update(check.id, {
          quantity: item.quantity + check.quantity,
        });
      }
      await this.recipeIngredientRepository.save({
        ingredient,
        recipe,
        quantity: item.quantity,
      });
      const message = await this.messageService.getMessage('CREATE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      let message;
      if (error.response.messageCode) {
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

  findOne(id: number) {
    return `This action returns a #${id} recipeIngredient`;
  }

  async update(item: UpdateRecipeIngredientDto) {
    try {
      if (!item.ingredientId) {
        throw new HttpException(
          {
            messageCode: 'INPUT_INGREDIENT_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (!item.recipeId) {
        throw new HttpException(
          {
            messageCode: 'INPUT_RECIPE_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (!item.quantity) {
        throw new HttpException(
          {
            messageCode: 'INPUT_QUANTITY_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const recipeIngredient = await this.recipeIngredientRepository.findOne({
        where: {
          recipe: Like(item.recipeId),
          ingredient: Like(item.ingredientId),
        },
      });
      if (recipeIngredient) {
        await this.recipeIngredientRepository.update(recipeIngredient.id, {
          quantity: item.quantity,
        });
        const message = await this.messageService.getMessage('UPDATE_SUCCESS');
        return {
          message: message,
        };
      } else {
        throw new HttpException(
          {
            messageCode: 'IS_NOT_EXIST_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      let message;
      if (error.response.messageCode) {
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

  async remove(item: DeleteRecipeIngredientDto) {
    try {
      if (!item.ingredientId) {
        throw new HttpException(
          {
            messageCode: 'INPUT_INGREDIENT_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (!item.recipeId) {
        throw new HttpException(
          {
            messageCode: 'INPUT_RECIPE_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const check = await this.recipeIngredientRepository.findOne({
        where: {
          ingredient: Like(item.ingredientId),
          recipe: Like(item.recipeId),
        },
      });
      if (!check) {
        throw new HttpException(
          {
            messageCode: 'IS_NOT_EXIST_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await this.recipeIngredientRepository.delete(check.id);
      const message = await this.messageService.getMessage('DELETE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      let message;
      if (error.response.messageCode) {
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
