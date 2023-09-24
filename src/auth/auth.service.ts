import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(User) readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    const role = await this.roleRepository.findOneBy({ id: 1 });
    createUserDto.password = hashPassword;
    createUserDto.verifyID = 0;
    if (!createUserDto.photo) {
      createUserDto.photo =
        'https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-nguoi-giau-mat-ngau-29-10-40-01.jpg';
    }
    await this.userRepository.save({
      ...createUserDto,
      role,
    });
    return {
      message: 'Đăng ký thành công',
    };
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['role'],
      select: {
        role: {
          roleName: true,
        },
      },
    });
  }
}
