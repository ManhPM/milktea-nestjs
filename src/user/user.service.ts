import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageService } from 'src/common/lib';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
    private readonly messageService: MessageService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<any> {
    try {
      const [res, total] = await this.userRepository.findAndCount({
        relations: ['account'],
        select: {
          account: {
            phone: true,
          },
        },
      });
      if (res) {
        const data = [
          {
            id: 0,
            name: '',
            phone: '',
            address: '',
            photo: '',
          },
        ];
        for (let i = 0; i < res.length; i++) {
          data[i] = {
            id: res[i].id,
            name: res[i].name,
            address: res[i].address,
            phone: res[i].account.phone,
            photo: res[i].photo,
          };
        }
        return {
          data: data,
        };
      }
      return {
        data: res,
        total,
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

  async getProfile(@Request() req) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          account: req.user.id,
        },
        relations: ['account'],
      });
      if (user) {
        const data = {
          id: 0,
          name: '',
          phone: '',
          address: '',
          photo: '',
        };
        data.id = user.id;
        data.name = user.name;
        data.phone = user.account.phone;
        data.address = user.address;
        data.photo = user.photo;
        return {
          data: data,
        };
      }
      return {
        data: user,
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

  async findOne(id: number) {
    return 'user';
  }

  async update(@Request() req, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update(req.user[0].id, {
        ...updateUserDto,
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
