import { HttpException, Injectable } from '@nestjs/common';
import { UpdateShippingCompanyDto } from './dto/update-shipping_company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingCompany } from './entities/shipping_company.entity';
import { CreateShippingCompanyDto } from './dto/create-shipping_company.dto';
import { GetFeeShip } from './dto/getFeeShip.dto';
import { Shop } from 'src/shop/entities/shop.entity';

@Injectable()
export class ShippingCompanyService {
  constructor(
    @InjectRepository(ShippingCompany)
    readonly shippingCompanyRepository: Repository<ShippingCompany>,
    @InjectRepository(Shop)
    readonly shopRepository: Repository<Shop>,
  ) {}

  async create(createShippingCompanyDto: CreateShippingCompanyDto) {
    try {
      await this.shippingCompanyRepository.save({
        ...createShippingCompanyDto,
      });
      return {
        message: 'Tạo mới thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi tạo mới đơn vị vận chuyển',
        },
        500,
      );
    }
  }

  async checkCreate(name: string, costPerKm: number) {
    try {
      return await this.shippingCompanyRepository.find({
        where: {
          name: name,
          costPerKm: costPerKm,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra khi tạo mới đơn vị vận chuyển',
        },
        500,
      );
    }
  }

  async update(id: number, updateShippingCompanyDto: UpdateShippingCompanyDto) {
    try {
      await this.shippingCompanyRepository.update(id, {
        ...updateShippingCompanyDto,
      });
      return {
        message: 'Cập nhật thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi cập nhật đơn vị vận chuyển',
        },
        500,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.shippingCompanyRepository.update(id, {
        isActive: 0,
      });
      return {
        message: 'Xoá thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi xoá đơn vị vận chuyển',
        },
        500,
      );
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.shippingCompanyRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra tồn tại đơn vị vận chuyển',
        },
        500,
      );
    }
  }

  async findAll() {
    try {
      const res = await this.shippingCompanyRepository.find({
        where: {
          isActive: 1,
        },
      });
      return {
        data: res,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách đơn vị vận chuyển',
        },
        500,
      );
    }
  }

  async getInfo(id: number) {
    try {
      const res = await this.shippingCompanyRepository.findOne({
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
          message: 'Lỗi lấy thông tin đơn vị vận chuyển',
        },
        500,
      );
    }
  }

  async getFeeShip(id: number, getFeeShip: GetFeeShip) {
    try {
      const shippingCompany = await this.shippingCompanyRepository.findOne({
        where: {
          id: id,
        },
      });
      const shop = await this.shopRepository.find({});
      const lat1 = getFeeShip.userLat;
      const lon1 = getFeeShip.userLng;
      const lat2 = Number(shop[0].latitude);
      const lon2 = Number(shop[0].longitude);
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1); // deg2rad below
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = Math.ceil(R * c); // Distance in km
      let feeShip = 0;
      if (distance >= 20) {
        throw new HttpException(
          {
            message: 'Cửa hàng không hỗ trợ giao trên 20km',
          },
          400,
        );
      } else {
        if (distance < 2) {
          feeShip = shippingCompany.costPerKm * 5;
        } else if (distance >= 2 && distance < 5) {
          feeShip = shippingCompany.costPerKm * 5 + 5000;
        } else if (distance >= 5 && distance < 10) {
          feeShip = shippingCompany.costPerKm * 5 + 10000;
        } else {
          feeShip = shippingCompany.costPerKm * 5 + 10000;
        }
        return {
          data: feeShip,
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy phí vận chuyển',
        },
        500,
      );
    }
  }
}

function deg2rad(arg0: number) {
  return arg0 * (Math.PI / 180);
}
