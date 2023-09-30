import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/account/entities/account.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from 'src/account/dto/create-account.dto.js';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) readonly accountRepository: Repository<Account>,
    @InjectRepository(User) readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(createAccountDto.password, salt);
      createAccountDto.password = hashPassword;
      createAccountDto.role = 0;
      createAccountDto.address = 'Địa chỉ';
      createAccountDto.photo =
        'https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-nguoi-giau-mat-ngau-29-10-40-01.jpg';
      const account = await this.accountRepository.save({
        ...createAccountDto,
      });
      await this.userRepository.save({
        ...createAccountDto,
        account,
      });
      return {
        message: 'Đăng ký thành công',
      };
    } catch (error) {
      return {
        HttpStatus: 500,
        message: error.message,
      };
    }
  }

  // async create(createTempAccountDto: CreateTemporaryAccountDto) {
  //   const salt = bcrypt.genSaltSync(10);
  //   const hashPassword = await bcrypt.hash(
  //     createTempAccountDto.password,
  //     salt,
  //   );
  //   createTempAccountDto.password = hashPassword;
  //   createTempAccountDto.forgot = 0;
  //   createTempAccountDto.role = 0;
  //   if (!createTempAccountDto.photo) {
  //     createTempAccountDto.photo =
  //       'https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-nguoi-giau-mat-ngau-29-10-40-01.jpg';
  //   }
  //   const account = await this.accountRepository.save({
  //     ...createTempAccountDto,
  //   });
  //   await this.userRepository.save({
  //     ...createTempAccountDto,
  //     account,
  //   });
  //   return {
  //     message: 'Đăng ký thành công',
  //   };
  // }

  async update(id: number, updateAccountDto: UpdateAccountDto): Promise<any> {
    await this.accountRepository.update(id, updateAccountDto);
    return {
      message: 'Cập nhật thành công',
    };
  }

  async findOne(phone: string): Promise<any> {
    return await this.accountRepository.findOne({
      where: { phone },
      relations: ['user', 'staff'],
    });
  }
}
