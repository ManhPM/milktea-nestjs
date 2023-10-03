import { HttpException, Injectable, Request } from '@nestjs/common';
import { CreateImportDto } from './dto/create-import.dto';
import { UpdateImportDto } from './dto/update-import.dto';
import { Import } from './entities/import.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, MoreThan, Repository } from 'typeorm';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ImportIngredient } from 'src/import_ingredient/entities/import_ingredient.entity';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(Import)
    readonly importRepository: Repository<Import>,
    @InjectRepository(Ingredient)
    readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(ImportIngredient)
    readonly importIngredientRepository: Repository<ImportIngredient>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<any> {
    try {
      const [res, total] = await this.importRepository.findAndCount({
        relations: ['staff'],
        where: {
          isCompleted: MoreThan(0),
        },
      });
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách hoá đơn nhập',
        },
        500,
      );
    }
  }

  async checkCreate(@Request() req) {
    try {
      return await this.importRepository.find({
        where: {
          staff: req.user[0].id,
          isCompleted: 0,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra khi tạo hoá đơn nhập',
        },
        500,
      );
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
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách nguyên liệu để nhập',
        },
        500,
      );
    }
  }

  async findOne(id: number) {
    try {
      const [res, total] = await this.importRepository.findAndCount({
        where: {
          id: id,
        },
        relations: ['staff', 'import_ingredients.ingredient'],
      });
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy thông tin hoá đơn nhập',
        },
        500,
      );
    }
  }

  async completeImport(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const exportIngredients = await this.importIngredientRepository.find({
        where: {
          import: Like('%' + id + '%'),
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
      await queryRunner.manager.update(Import, id, {
        total: totalAmount,
        isCompleted: 1,
      });

      await queryRunner.commitTransaction();

      return {
        message: 'Hoàn thành hoá đơn nhập',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          message: 'Lỗi hoàn thành hoá đơn nhập',
        },
        500,
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
      const res = await this.importRepository.save({
        ...createImportDto,
        staff: req.user[0].id,
      });
      return {
        data: res,
        message: 'Tạo mới thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi tạo mới hoá đơn nhập',
        },
        500,
      );
    }
  }

  async update(id: number, updateImportDto: UpdateImportDto) {
    try {
      await this.importRepository.update(id, {
        ...updateImportDto,
      });
      return {
        message: 'Cập nhật thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi cập nhật hoá đơn nhập',
        },
        500,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.importRepository.update(id, {
        isCompleted: -1,
      });
      return {
        message: 'Xoá thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi xoá hoá đơn nhập',
        },
        500,
      );
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.importRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra tồn tại hoá đơn nhập',
        },
        500,
      );
    }
  }
}
