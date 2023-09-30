import { Injectable, Request } from '@nestjs/common';
import { CreateImportDto } from './dto/create-import.dto';
import { UpdateImportDto } from './dto/update-import.dto';
import { Import } from './entities/import.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';
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
  ) {}

  async findAll(): Promise<any> {
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
  }

  async findIngredientImport(id: number): Promise<any> {
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
  }

  async findOne(id: number) {
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
  }

  async completeImport(id: number) {
    try {
      const importIngredients = await this.importIngredientRepository.find({
        where: {
          import: Like('%' + id + '%'),
        },
        relations: ['ingredient'],
      });
      let totalAmount = 0;
      for (const importIngredient of importIngredients) {
        totalAmount += importIngredient.quantity * importIngredient.unitPrice;
        await this.ingredientRepository
          .createQueryBuilder()
          .update(Ingredient)
          .set({ quantity: () => '`quantity` + :newQuantity' })
          .where('id = :id', { id: importIngredient.ingredient.id })
          .setParameter('newQuantity', importIngredient.quantity)
          .execute();
      }
      await this.importRepository.update(id, {
        total: totalAmount,
        isCompleted: 1,
      });
      return {
        message: 'Hoàn thành hoá đơn nhập',
      };
    } catch (error) {
      return {
        message: 'Hoàn thành hoá đơn nhập thất bại',
      };
    }
  }

  async create(createImportDto: CreateImportDto, @Request() req) {
    try {
      const date = new Date();
      date.setHours(date.getHours() + 7);
      createImportDto.date = date;
      await this.importRepository.save({
        ...createImportDto,
        staff: req.user[0].id,
      });
      return {
        message: 'Tạo mới thành công',
      };
    } catch (error) {
      return {
        message: error.message,
      };
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
      return {
        message: error.message,
      };
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
      return {
        message: error.message,
      };
    }
  }
}
