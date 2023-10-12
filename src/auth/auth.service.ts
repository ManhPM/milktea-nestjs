import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable, HttpStatus, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/account/entities/account.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from 'src/account/dto/create-account.dto.js';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';
import { MessageService } from 'src/common/lib';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) readonly accountRepository: Repository<Account>,
    @InjectRepository(User) readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly messageService: MessageService,
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
      const message = await this.messageService.getMessage('REGISTER_SUCCESS');
      return {
        message: message,
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

  async update(@Request() req, updateAccountDto: UpdateAccountDto) {
    try {
      await this.accountRepository.update(req.user[0].id, {
        ...updateAccountDto,
      });
      const message = await this.messageService.getMessage('UPDATE_SUCCESS');
      return {
        message: message,
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

  async findOne(phone: string): Promise<any> {
    try {
      return await this.accountRepository.findOne({
        where: { phone },
        relations: ['user', 'staff'],
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

  async checkExistPhone(phone: string): Promise<any> {
    try {
      return await this.accountRepository.findOne({
        where: { phone },
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
}
