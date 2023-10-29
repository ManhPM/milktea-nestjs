import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import { FilterIngredientDto } from './dto/filter-ingredient.dto';
import { MessageService } from '../common/lib';
import { RecipeIngredient } from 'src/recipe_ingredient/entities/recipe_ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(RecipeIngredient)
    readonly recipeIngredientRepository: Repository<RecipeIngredient>,
    private readonly messageService: MessageService,
  ) {}

  async checkCreate(name: string, unitName: string) {
    try {
      return await this.ingredientRepository.findOne({
        where: {
          name: name,
          unitName: unitName,
        },
      });
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

  async create(item: CreateIngredientDto) {
    try {
      item.isActive = 1;
      item.quantity = 0;
      await this.ingredientRepository.save({
        ...item,
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

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    try {
      await this.ingredientRepository.update(id, {
        name: updateIngredientDto.name,
        image: updateIngredientDto.image,
        unitName: updateIngredientDto.unitName,
      });
      const message = await this.messageService.getMessage('UPDATE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      console.log(error);
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

  async remove(id: number) {
    try {
      const check = await await this.recipeIngredientRepository.findOne({
        where: {
          ingredient: Like(id),
          recipe: {
            isActive: Not(0),
          },
        },
        relations: ['recipe'],
      });
      if (check) {
        throw new HttpException(
          {
            messageCode: 'DELETE_INGREDIENT_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const ingredient = await this.ingredientRepository.findOne({
        where: {
          id: id,
        },
      });
      if (ingredient.isActive == 1) {
        await this.ingredientRepository.update(id, {
          isActive: 0,
        });
        const message = await this.messageService.getMessage('DELETE_SUCCESS');
        return {
          message: message,
        };
      } else {
        await this.ingredientRepository.update(id, {
          isActive: 1,
        });
        const message = await this.messageService.getMessage(
          'UNDELETE_INGREDIENT_SUCCESS',
        );
        return {
          message: message,
        };
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

  async findAll(query: FilterIngredientDto) {
    try {
      const name = query.name;
      let res = [];
      if (name) {
        const res1 = await this.ingredientRepository.find({
          where: {
            name,
            isActive: 1,
          },
        });
        const res2 = await this.ingredientRepository.find({
          where: {
            name,
            isActive: 2,
          },
        });
        const res0 = await this.ingredientRepository.find({
          where: {
            name,
            isActive: 0,
          },
        });
        res = [...res1, ...res2, ...res0];
      } else {
        const res1 = await this.ingredientRepository.find({
          where: {
            isActive: 1,
          },
        });
        const res2 = await this.ingredientRepository.find({
          where: {
            isActive: 2,
          },
        });
        const res0 = await this.ingredientRepository.find({
          where: {
            isActive: 0,
          },
        });
        res = [...res1, ...res2, ...res0];
      }
      return {
        data: res,
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

  async findOne(id: number) {
    try {
      const res = await this.ingredientRepository.findOne({
        where: {
          id: id,
        },
      });
      return {
        data: res,
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

  async checkExist(id: number): Promise<any> {
    try {
      return await this.ingredientRepository.findOne({
        where: { id },
      });
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
