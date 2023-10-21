import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipeTypeDto } from './dto/create-recipe_type.dto';
import { DeleteRecipeTypeDto } from './dto/delete-recipe_type.dto';
import { RecipeType } from './entities/recipe_type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Type } from 'src/type/entities/type.entity';
import { MessageService } from 'src/common/lib';

@Injectable()
export class RecipeTypeService {
  constructor(
    @InjectRepository(RecipeType)
    readonly recipeTypeRepository: Repository<RecipeType>,
    @InjectRepository(Recipe)
    readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Type)
    readonly typeRepository: Repository<Type>,
    private readonly messageService: MessageService,
  ) {}
  async create(item: CreateRecipeTypeDto) {
    try {
      const check = await this.recipeTypeRepository.findOne({
        where: {
          type: Like('%' + item.typeId + '%'),
          recipe: Like('%' + item.recipeId + '%'),
        },
      });
      if (check) {
        throw new HttpException(
          {
            messageCode: 'IS_EXIST_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const recipe = await this.recipeRepository.findOne({
        where: {
          id: item.recipeId,
        },
        relations: ['type'],
      });
      const type = await this.typeRepository.findOne({
        where: {
          id: item.typeId,
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
      if (!type) {
        throw new HttpException(
          {
            messageCode: 'TYPE_NOTFOUND',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (recipe.type.id != 5) {
        throw new HttpException(
          {
            messageCode: 'ADD_TOPPING_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await this.recipeTypeRepository.save({
        type,
        recipe,
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

  async findAll(id: number): Promise<any> {
    try {
      const res = await this.recipeTypeRepository.find({
        where: {
          type: Like('%' + id + '%'),
        },
        relations: ['recipe'],
      });
      if (res[0]) {
        const data = [];
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

  async remove(item: DeleteRecipeTypeDto) {
    try {
      const check = await this.recipeTypeRepository.findOne({
        where: {
          type: Like('%' + item.typeId + '%'),
          recipe: Like('%' + item.recipeId + '%'),
        },
      });
      console.log(check);
      if (!check) {
        throw new HttpException(
          {
            messageCode: 'IS_NOT_EXIST_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await this.recipeTypeRepository.delete(check.id);
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

  findOne(id: number) {
    return `This action returns a #${id} recipeType`;
  }

  update(id: number) {
    return `This action updates a #${id} recipeType`;
  }
}
