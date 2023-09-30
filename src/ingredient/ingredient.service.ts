import { Injectable } from '@nestjs/common';
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
      return {
        message: error.message,
      };
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
      return {
        message: error.message,
      };
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
      return {
        message: error.message,
      };
    }
  }

  async findAll(query: FilterIngredientDto) {
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
  }

  async findOne(id: number) {
    const res = await this.ingredientRepository.findOne({
      where: {
        id: id,
      },
    });
    return {
      data: res,
    };
  }
}
