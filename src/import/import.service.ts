import {
  HttpException,
  HttpStatus,
  Injectable,
  Query,
  Request,
} from '@nestjs/common';
import { CreateImportDto } from './dto/create-import.dto';
import { UpdateImportDto } from './dto/update-import.dto';
import { Import } from './entities/import.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, Like, MoreThan, Repository } from 'typeorm';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ImportIngredient } from 'src/import_ingredient/entities/import_ingredient.entity';
import { CreateImportIngredientDto } from 'src/import_ingredient/dto/create-import_ingredient.dto';
import { UpdateImportIngredientDto } from 'src/import_ingredient/dto/update-import_ingredient.dto';
import {
  MessageService,
  isDateGreaterThanNow,
  isValidDate,
} from 'src/common/lib';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(Import)
    readonly importRepository: Repository<Import>,
    @InjectRepository(Recipe)
    readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(ImportIngredient)
    readonly importIngredientRepository: Repository<ImportIngredient>,
    private dataSource: DataSource,
    private readonly messageService: MessageService,
  ) {}

  async findAll(@Query() query): Promise<any> {
    try {
      const fromDate = query.fromdate;
      const toDate = query.todate;
      const status = query.status;
      let res = [];
      if (fromDate && toDate) {
        if (status) {
          res = await this.importRepository.find({
            relations: ['staff'],
            where: {
              isCompleted: status,
              date: Between(fromDate, toDate),
            },
            order: {
              date: 'DESC', // hoặc "DESC" để sắp xếp giảm dần
            },
          });
        } else {
          res = await this.importRepository.find({
            relations: ['staff'],
            where: {
              date: Between(fromDate, toDate),
            },
            order: {
              date: 'DESC', // hoặc "DESC" để sắp xếp giảm dần
            },
          });
        }
      } else {
        if (status) {
          res = await this.importRepository.find({
            relations: ['staff'],
            where: {
              isCompleted: status,
            },
            order: {
              date: 'DESC', // hoặc "DESC" để sắp xếp giảm dần
            },
          });
        } else {
          res = await this.importRepository.find({
            relations: ['staff'],
            order: {
              date: 'DESC', // hoặc "DESC" để sắp xếp giảm dần
            },
          });
        }
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

  async findIngredientImport(id: number): Promise<any> {
    try {
      const ingredients = await this.ingredientRepository.find({});
      const importedIngredients = await this.importIngredientRepository.find({
        where: {
          import: Like('%' + id + '%'),
        },
      });
      const nonImportedIngredients = ingredients.filter(
        (ingredient) =>
          !importedIngredients.some(
            (importedIngredient) => importedIngredient.id === ingredient.id,
          ),
      );
      return {
        data: nonImportedIngredients,
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

  async findOne(id: number) {
    try {
      const res = await this.importRepository.findOne({
        where: {
          id: id,
        },
        relations: ['staff', 'import_ingredients.ingredient'],
      });
      const data = {
        id: null,
        date: null,
        isCompleted: null,
        total: null,
        description: null,
        staff: {},
        ingredients: [
          {
            quantity: 0,
          },
        ],
      };
      if (res) {
        data.id = res.id;
        data.date = res.date;
        data.isCompleted = res.isCompleted;
        data.total = res.total;
        data.description = res.description;
        data.staff = res.staff;
        for (let i = 0; i < res.import_ingredients.length; i++) {
          data.ingredients[i] = res.import_ingredients[i].ingredient;
          data.ingredients[i].quantity = res.import_ingredients[i].quantity;
        }
        return data;
      }
      return null;
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

  async completeImport(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const importIngredients = await this.importIngredientRepository.find({
        where: {
          import: Like('%' + id + '%'),
        },
        relations: ['ingredient'],
      });
      let totalAmount = 0;
      for (const importIngredient of importIngredients) {
        totalAmount += importIngredient.price;
        await queryRunner.manager
          .createQueryBuilder()
          .update(Ingredient)
          .set({ quantity: () => '`quantity` + :newQuantity' })
          .where('id = :id', { id: importIngredient.ingredient.id })
          .setParameter('newQuantity', importIngredient.quantity)
          .execute();
      }
      const recipes = await this.recipeRepository.find({
        where: {
          isActive: 2,
        },
        relations: ['recipe_ingredients.ingredient'],
      });

      if (recipes[0]) {
        for (const recipe of recipes) {
          let canActive = 1;
          for (let i = 0; i < recipe.recipe_ingredients.length; i++) {
            if (
              recipe.recipe_ingredients[i].quantity >
              recipe.recipe_ingredients[i].ingredient.quantity
            ) {
              canActive = 0;
            }
            if (canActive) {
              await this.recipeRepository.update(recipe.id, {
                isActive: 1,
              });
            }
          }
        }
      }
      await queryRunner.manager.update(Import, id, {
        total: totalAmount,
        isCompleted: 1,
      });

      await queryRunner.commitTransaction();

      const message = await this.messageService.getMessage(
        'COMPLETE_IMPORT_SUCCESS',
      );
      return {
        message: message,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async create(createImportDto: CreateImportDto, @Request() req) {
    try {
      const date = new Date();
      date.setHours(date.getHours() + 7);
      createImportDto.date = date;
      const check = await this.importRepository.findOne({
        where: {
          staff: req.user.id,
          isCompleted: 0,
        },
      });
      if (!createImportDto.description) {
        createImportDto.description = 'Mô tả';
      }
      if (check) {
        throw new HttpException(
          {
            messageCode: 'IMPORT_ISEXIST_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.importRepository.save({
        ...createImportDto,
        staff: req.user.id,
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

  async update(id: number, updateImportDto: UpdateImportDto) {
    try {
      await this.importRepository.update(id, {
        ...updateImportDto,
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

  async createIngredientImport(item: CreateImportIngredientDto) {
    try {
      const importInvoice = await this.importRepository.findOne({
        where: {
          id: item.importId,
        },
      });
      const ingredient = await this.ingredientRepository.findOne({
        where: {
          id: item.ingredientId,
        },
      });
      const importIngredient = await this.importIngredientRepository.findOne({
        where: {
          import: Like('%' + importInvoice.id + '%'),
          ingredient: Like('%' + ingredient.id + '%'),
        },
      });
      if (importIngredient) {
        throw new HttpException(
          {
            messageCode: 'IMPORT_EXPORT_INGREDIENT_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.importIngredientRepository.save({
        ...item,
        import: importInvoice,
        ingredient: ingredient,
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

  async deleteIngredientImport(item: UpdateImportIngredientDto) {
    try {
      const importInvoice = await this.importRepository.findOne({
        where: {
          id: item.importId,
        },
      });
      const ingredient = await this.ingredientRepository.findOne({
        where: {
          id: item.ingredientId,
        },
      });
      await this.importIngredientRepository.delete({
        ingredient: ingredient,
        import: importInvoice,
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

  async remove(id: number) {
    try {
      const check = await this.importRepository.findOne({
        where: {
          id: id,
        },
      });
      if (check.isCompleted != 0) {
        throw new HttpException(
          {
            messageCode: 'CANCEL_INVOICE_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.importRepository.update(id, {
        isCompleted: -1,
      });
      const message = await this.messageService.getMessage('CANCEL_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      if (error.response.messageCode) {
        const message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
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

  async checkExist(id: number): Promise<any> {
    try {
      return await this.importRepository.findOne({
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
}
