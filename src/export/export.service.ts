import {
  HttpException,
  HttpStatus,
  Injectable,
  Query,
  Request,
} from '@nestjs/common';
import { CreateExportDto } from './dto/create-export.dto';
import { UpdateExportDto } from './dto/update-export.dto';
import { Between, DataSource, Like, Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Export } from './entities/export.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ExportIngredient } from 'src/export_ingredient/entities/export_ingredient.entity';
import { CreateExportIngredientDto } from 'src/export_ingredient/dto/create-export_ingredient.dto';
import { UpdateExportIngredientDto } from 'src/export_ingredient/dto/update-export_ingredient.dto';
import {
  MessageService,
  isDateGreaterThanNow,
  isValidDate,
} from 'src/common/lib';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(Export)
    readonly exportRepository: Repository<Export>,
    @InjectRepository(Ingredient)
    readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Recipe)
    readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(ExportIngredient)
    readonly exportIngredientRepository: Repository<ExportIngredient>,
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
          res = await this.exportRepository.find({
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
          res = await this.exportRepository.find({
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
          res = await this.exportRepository.find({
            relations: ['staff'],
            where: {
              isCompleted: status,
            },
            order: {
              date: 'DESC', // hoặc "DESC" để sắp xếp giảm dần
            },
          });
        } else {
          res = await this.exportRepository.find({
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
      const res = await this.exportRepository.findOne({
        where: {
          id: id,
        },
        relations: ['staff', 'export_ingredients.ingredient'],
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
        for (let i = 0; i < res.export_ingredients.length; i++) {
          data.ingredients[i] = res.export_ingredients[i].ingredient;
          data.ingredients[i].quantity = res.export_ingredients[i].quantity;
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

  async findIngredientExport(id: number): Promise<any> {
    try {
      const ingredients = await this.ingredientRepository.find({});
      const exportedIngredients = await this.exportIngredientRepository.find({
        where: {
          export: Like('%' + id + '%'),
        },
      });
      const nonExportedIngredients = ingredients.filter(
        (ingredient) =>
          !exportedIngredients.some(
            (exportedIngredient) => exportedIngredient.id === ingredient.id,
          ),
      );
      return {
        data: nonExportedIngredients,
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

  async create(item: CreateExportDto, @Request() req) {
    try {
      const date = new Date();
      date.setHours(date.getHours() + 7);
      item.date = date;
      if (!item.description) {
        item.description = 'Mô tả';
      }
      const check = await this.exportRepository.findOne({
        where: {
          staff: req.user.id,
          isCompleted: 0,
        },
      });
      if (check) {
        throw new HttpException(
          {
            messageCode: 'EXPORT_ISEXIST_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.exportRepository.save({
        ...item,
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

  async createIngredientExport(item: CreateExportIngredientDto) {
    try {
      const exportInvoice = await this.exportRepository.findOne({
        where: {
          id: item.exportId,
        },
      });
      const ingredient = await this.ingredientRepository.findOne({
        where: {
          id: item.ingredientId,
        },
      });
      const exportIngredient = await this.exportIngredientRepository.findOne({
        where: {
          export: Like('%' + exportInvoice.id + '%'),
          ingredient: Like('%' + ingredient.id + '%'),
        },
      });
      if (exportIngredient) {
        throw new HttpException(
          {
            messageCode: 'IMPORT_EXPORT_INGREDIENT_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.exportIngredientRepository.save({
        ...item,
        export: exportInvoice,
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

  async deleteIngredientExport(item: UpdateExportIngredientDto) {
    try {
      const exportInvoice = await this.exportRepository.findOne({
        where: {
          id: item.exportId,
        },
      });
      const ingredient = await this.ingredientRepository.findOne({
        where: {
          id: item.ingredientId,
        },
      });
      await this.exportIngredientRepository.delete({
        ingredient: ingredient,
        export: exportInvoice,
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

  async completeExport(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const exportIngredients = await this.exportIngredientRepository.find({
        where: {
          export: Like('%' + id + '%'),
        },
        relations: ['ingredient'],
      });
      let totalAmount = 0;
      for (const exportIngredient of exportIngredients) {
        totalAmount += exportIngredient.price;
        await queryRunner.manager
          .createQueryBuilder()
          .update(Ingredient)
          .set({ quantity: () => '`quantity` - :newQuantity' })
          .where('id = :id', { id: exportIngredient.ingredient.id })
          .setParameter('newQuantity', exportIngredient.quantity)
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
      await queryRunner.manager.update(Export, id, {
        total: totalAmount,
        isCompleted: 1,
      });

      await queryRunner.commitTransaction();
      const message = await this.messageService.getMessage(
        'COMPLETE_EXPORT_SUCCESS',
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

  async update(id: number, item: UpdateExportDto) {
    try {
      await this.exportRepository.update(id, {
        ...item,
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
      const check = await this.exportRepository.findOne({
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
      await this.exportRepository.update(id, {
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
      return await this.exportRepository.findOne({
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
