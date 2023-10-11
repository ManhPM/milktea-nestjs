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
      const recipeId = item.recipeId;
      const typeId = item.typeId;
      const recipe = await this.recipeRepository.findOne({
        where: {
          id: recipeId,
        },
      });
      const type = await this.typeRepository.findOne({
        where: {
          id: typeId,
        },
      });
      await this.recipeTypeRepository.save({
        type,
        recipe,
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

  async remove(item: DeleteRecipeTypeDto) {
    try {
      const recipeId = item.recipeId;
      const typeId = item.typeId;
      await this.recipeTypeRepository.delete({
        recipe: Like('%' + recipeId + '%'),
        type: Like('%' + typeId + '%'),
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

  async findAll(id: number): Promise<any> {
    try {
      const [res, total] = await this.recipeTypeRepository.findAndCount({
        where: {
          type: Like('%' + id + '%'),
        },
        relations: ['recipe', 'type'],
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
    return `This action returns a #${id} recipeType`;
  }

  update(id: number) {
    return `This action updates a #${id} recipeType`;
  }
}
