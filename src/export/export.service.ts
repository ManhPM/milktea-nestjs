import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { CreateExportDto } from './dto/create-export.dto';
import { UpdateExportDto } from './dto/update-export.dto';
import { DataSource, Like, Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Export } from './entities/export.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ExportIngredient } from 'src/export_ingredient/entities/export_ingredient.entity';
import { CreateExportIngredientDto } from 'src/export_ingredient/dto/create-export_ingredient.dto';
import { UpdateExportIngredientDto } from 'src/export_ingredient/dto/update-export_ingredient.dto';
import { MessageService } from 'src/common/lib';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(Export)
    readonly exportRepository: Repository<Export>,
    @InjectRepository(Ingredient)
    readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(ExportIngredient)
    readonly exportIngredientRepository: Repository<ExportIngredient>,
    private dataSource: DataSource,
    private readonly messageService: MessageService,
  ) {}

  async findAll(): Promise<any> {
    try {
      const [res, total] = await this.exportRepository.findAndCount({
        relations: ['staff'],
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

  async checkCreate(@Request() req) {
    try {
      return await this.exportRepository.find({
        where: {
          staff: req.user[0].id,
          isCompleted: 0,
        },
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
      await this.exportRepository.save({
        ...item,
        staff: req.user[0].id,
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
      await this.exportRepository.update(id, {
        isCompleted: -1,
      });
      const message = await this.messageService.getMessage('CANCEL_SUCCESS');
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
