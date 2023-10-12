import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { MessageService } from 'src/common/lib';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    readonly shopRepository: Repository<Shop>,
    private readonly messageService: MessageService,
  ) {}
  create(createShopDto: CreateShopDto) {
    return 'This action adds a new shop';
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.shopRepository.findOne({
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

  async findAll(): Promise<any> {
    try {
      const res = await this.shopRepository.find({});
      return {
        data: res[0],
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

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  async update(item: UpdateShopDto) {
    try {
      await this.shopRepository.update(1, {
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

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
