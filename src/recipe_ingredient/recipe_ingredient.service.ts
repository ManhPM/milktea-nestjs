import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipeIngredientDto } from './dto/create-recipe_ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe_ingredient.dto';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DeleteRecipeIngredientDto } from './dto/delete-recipe_ingredient.dto';
import { MessageService } from 'src/common/lib';

@Injectable()
export class RecipeIngredientService {
  constructor(
    @InjectRepository(RecipeIngredient)
    readonly recipeIngredientRepository: Repository<RecipeIngredient>,
    private readonly messageService: MessageService,
  ) {}
  async create(item: CreateRecipeIngredientDto) {
    try {
      await this.recipeIngredientRepository.save({
        ...item,
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

  async remove(item: DeleteRecipeIngredientDto) {
    try {
      await this.recipeIngredientRepository.delete({
        recipe: Like('%' + item.recipeId + '%'),
        ingredient: Like('%' + item.ingredientId + '%'),
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
