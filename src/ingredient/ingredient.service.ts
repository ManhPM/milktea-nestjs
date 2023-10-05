import { HttpException, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterIngredientDto } from './dto/filter-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async checkCreate(name: string, unitName: string) {
    try {
      return await this.ingredientRepository.find({
        where: {
          name: name,
          unitName: unitName,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra khi tạo mới nguyên liệu',
          error: error.message,
        },
        500,
      );
    }
  }

  async create(item: CreateIngredientDto) {
    try {
      item.isActive = 1;
      item.quantity = 0;
      await this.ingredientRepository.save({
        ...item,
      });
      return {
        message: 'Tạo mới thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi tạo mới nguyên liệu',
          error: error.message,
        },
        500,
      );
    }
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    try {
      await this.ingredientRepository.update(id, {
        ...updateIngredientDto,
      });
      return {
        message: 'Cập nhật thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi cập nhật nguyên liệu',
          error: error.message,
        },
        500,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.ingredientRepository.update(id, {
        isActive: 0,
      });
      return {
        message: 'Xoá thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi xoá nguyên liệu',
          error: error.message,
        },
        500,
      );
    }
  }

  async findAll(query: FilterIngredientDto) {
    try {
      const name = query.name;
      let res = [];
      let total = 0;
      if (name) {
        [res, total] = await this.ingredientRepository.findAndCount({
          where: {
            name,
          },
        });
      } else {
        [res, total] = await this.ingredientRepository.findAndCount({});
      }
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách nguyên liệu',
          error: error.message,
        },
        500,
      );
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
      throw new HttpException(
        {
          message: 'Lỗi lấy thông tin nguyên liệu',
          error: error.message,
        },
        500,
      );
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.ingredientRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra tồn tại nguyên liệu',
          error: error.message,
        },
        500,
      );
    }
  }
}
