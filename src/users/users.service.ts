import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashPassword;
    await this.userRepository.save(createUserDto);
    return {
      message: 'Đăng ký thành công',
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return {
      message: 'Cập nhật thành công',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
