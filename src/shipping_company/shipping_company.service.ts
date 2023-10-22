import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { UpdateShippingCompanyDto } from './dto/update-shipping_company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingCompany } from './entities/shipping_company.entity';
import { CreateShippingCompanyDto } from './dto/create-shipping_company.dto';
import { GetFeeShip } from './dto/getFeeShip.dto';
import { Shop } from '../shop/entities/shop.entity';
import { calDistance } from '../common/lib';
import { MessageService } from '../common/lib';

@Injectable()
export class ShippingCompanyService {
  constructor(
    @InjectRepository(ShippingCompany)
    readonly shippingCompanyRepository: Repository<ShippingCompany>,
    @InjectRepository(Shop)
    readonly shopRepository: Repository<Shop>,
    private readonly messageService: MessageService,
  ) {}

  async create(createShippingCompanyDto: CreateShippingCompanyDto) {
    try {
      await this.shippingCompanyRepository.save({
        ...createShippingCompanyDto,
      });
      const message = await this.messageService.getMessage('CREATE_SUCCESS');
      return {
        message: message,
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

  async checkCreate(name: string, costPerKm: number) {
    try {
      return await this.shippingCompanyRepository.findOne({
        where: {
          name: name,
          costPerKm: costPerKm,
        },
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

  async update(id: number, updateShippingCompanyDto: UpdateShippingCompanyDto) {
    try {
      await this.shippingCompanyRepository.update(id, {
        ...updateShippingCompanyDto,
      });
      const message = await this.messageService.getMessage('UPDATE_SUCCESS');
      return {
        message: message,
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

  async remove(id: number) {
    try {
      await this.shippingCompanyRepository.update(id, {
        isActive: 0,
      });
      const message = await this.messageService.getMessage('DELETE_SUCCESS');
      return {
        message: message,
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

  async checkExist(id: number): Promise<any> {
    try {
      return await this.shippingCompanyRepository.findOne({
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

  async getFeeShip(id: number, @Query() query) {
    try {
      const shippingCompany = await this.shippingCompanyRepository.findOne({
        where: {
          id: id,
        },
      });
      const shop = await this.shopRepository.find({});
      const lat1 = query.userLat;
      const lon1 = query.userLng;
      const lat2 = Number(shop[0].latitude);
      const lon2 = Number(shop[0].longitude);
      const distance = calDistance(lat1, lon1, lat2, lon2);
      let feeShip = 0;
      if (distance >= 20) {
        throw new HttpException(
          {
            messageCode: 'GET_FEESHIP_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        if (distance < 2) {
          feeShip = shippingCompany.costPerKm * 5;
        } else if (distance >= 2 && distance < 5) {
          feeShip = shippingCompany.costPerKm * 5 + 5;
        } else if (distance >= 5 && distance < 10) {
          feeShip = shippingCompany.costPerKm * 5 + 10;
        } else {
          feeShip = shippingCompany.costPerKm * 5 + 10;
        }
        return {
          data: feeShip,
          distance: distance,
        };
      }
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
}
