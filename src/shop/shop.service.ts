import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { MessageService } from '../common/lib';

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

  async findAll(): Promise<any> {
    try {
      const res = await this.shopRepository.find({});
      return {
        data: res[0],
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

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  async update(item: UpdateShopDto) {
    try {
      const shop = await this.shopRepository.findOne({
        where: {
          id: 1,
        },
      });
      console.log(item);
      const date = new Date();
      date.setHours(date.getHours() + 7);
      await this.shopRepository.update(1, {
        address: item.address ? item.address : shop.address,
        image: item.image ? item.image : shop.image,
        isActive:
          item.isActive === 0 || item.isActive === 1
            ? item.isActive
            : shop.isActive,
        longitude: item.longitude ? item.longitude : shop.longitude,
        latitude: item.latitude ? item.latitude : shop.latitude,
        upSizePrice: item.upSizePrice ? item.upSizePrice : shop.upSizePrice,
        updateAt: date,
      });
      const message = await this.messageService.getMessage('UPDATE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      console.log(error);
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

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
