import { Injectable, Request } from '@nestjs/common';
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
  }

  async getProfile(@Request() req) {
    const user = await this.userRepository.findOne({
      where: {
        account: req.user.id,
      },
      relations: ['account'],
    });
    delete user.account.password;
    delete user.account.role;
    return user;
  }

  async findOne(id: number) {
    return 'user';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
