import { HttpException, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    readonly shopRepository: Repository<Shop>,
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
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra tồn tại thông tin cửa hàng',
        },
        500,
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
      throw new HttpException(
        {
          message: 'Lỗi lấy thông tin cửa hàng',
        },
        500,
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
      return {
        message: 'Cập nhật thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi cập nhật thông tin cửa hàng',
        },
        500,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
