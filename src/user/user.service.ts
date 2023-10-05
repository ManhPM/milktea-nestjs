import { HttpException, Injectable, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
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
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách khách hàng',
          error: error.message,
        },
        500,
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
      delete user.account.password;
      delete user.account.role;
      return user;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy thông tin khách hàng',
          error: error.message,
        },
        500,
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
      throw new HttpException(
        {
          message: 'Lỗi cập nhật thông tin khách hàng',
          error: error.message,
        },
        500,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
