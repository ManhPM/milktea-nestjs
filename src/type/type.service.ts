import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getMessage } from 'src/common/lib';

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
      const message = await getMessage('CREATE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      const message = await getMessage('INTERNAL_SERVER_ERROR');
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
      return await this.typeRepository.findOne({
        where: { id },
      });
    } catch (error) {
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    try {
      await this.typeRepository.update(id, {
        ...updateTypeDto,
      });
      const message = await getMessage('UPDATE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
