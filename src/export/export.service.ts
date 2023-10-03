import { HttpException, Injectable, Request } from '@nestjs/common';
import { CreateExportDto } from './dto/create-export.dto';
import { UpdateExportDto } from './dto/update-export.dto';
import { DataSource, Like, Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Export } from './entities/export.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ExportIngredient } from 'src/export_ingredient/entities/export_ingredient.entity';

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
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách hoá đơn xuất',
        },
        500,
      );
    }
  }

  async findOne(id: number) {
    try {
      const [res, total] = await this.exportRepository.findAndCount({
        where: {
          id: id,
        },
        relations: ['staff', 'export_ingredients.ingredient'],
      });
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy thông tin hoá đơn xuất',
        },
        500,
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
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra khi tạo hoá đơn xuất',
        },
        500,
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
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách nguyên liệu để xuất',
        },
        500,
      );
    }
  }

  async create(item: CreateExportDto, @Request() req) {
    try {
      const date = new Date();
      date.setHours(date.getHours() + 7);
      item.date = date;
      const res = await this.exportRepository.save({
        ...item,
        staff: req.user[0].id,
      });
      return {
        data: res,
        message: 'Tạo mới thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi tạo mới hoá đơn xuất',
        },
        500,
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

      return {
        message: 'Hoàn thành hoá đơn xuất',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          message: 'Lỗi hoàn thành hoá đơn xuất',
        },
        500,
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
      return {
        message: 'Cập nhật thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi cập nhật hoá đơn xuất',
        },
        500,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.exportRepository.update(id, {
        isCompleted: -1,
      });
      return {
        message: 'Xoá thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi xoá hoá đơn xuất',
        },
        500,
      );
    }
  }
  async checkExist(id: number): Promise<any> {
    try {
      return await this.exportRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra tồn tại hoá đơn xuất',
        },
        500,
      );
    }
  }
}
