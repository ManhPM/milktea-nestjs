import { HttpException, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    readonly typeRepository: Repository<Type>,
  ) {}
  async create(createTypeDto: CreateTypeDto) {
    try {
      await this.typeRepository.save({
        ...createTypeDto,
      });
      return {
        message: 'Tạo mới thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi tạo mới loại hàng',
          error: error.message,
        },
        500,
      );
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.typeRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra tồn tại loại hàng',
          error: error.message,
        },
        500,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const [res, total] = await this.typeRepository.findAndCount({});
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách loại hàng',
          error: error.message,
        },
        500,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  async checkCreate(name: string) {
    try {
      return await this.typeRepository.findOne({
        where: {
          name: name,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra khi tạo mới loại hàng',
          error: error.message,
        },
        500,
      );
    }
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    try {
      await this.typeRepository.update(id, {
        ...updateTypeDto,
      });
      return {
        message: 'Cập nhật thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi cập nhật loại hàng',
          error: error.message,
        },
        500,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
