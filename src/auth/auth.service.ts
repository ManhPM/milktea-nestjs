import { MailerService } from '@nestjs-modules/mailer';
import * as twilio from 'twilio';
import { HttpException, Injectable, HttpStatus, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/account/entities/account.entity';
import { User } from 'src/user/entities/user.entity';
import { LessThan, Like, Repository } from 'typeorm';
import { CreateAccountDto } from 'src/account/dto/create-account.dto.js';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';
import { MessageService, convertPhoneNumber, isNumberic } from 'src/common/lib';
import { Verify } from 'src/verify/entities/verify.entity';
import { ChangePassword } from 'src/user/dto/changepassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) readonly accountRepository: Repository<Account>,
    @InjectRepository(User) readonly userRepository: Repository<User>,
    @InjectRepository(Verify) readonly verifyRepository: Repository<Verify>,
    private readonly mailerService: MailerService,
    private readonly messageService: MessageService,
  ) {}

  async sendSms(phoneNumber: string) {
    try {
      if (!phoneNumber) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PHONE_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!isNumberic(phoneNumber)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PHONE_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (phoneNumber.length != 10) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PHONE_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const phone = await this.accountRepository.findOne({
        where: {
          phone: phoneNumber,
        },
      });
      if (phone) {
        throw new HttpException(
          {
            messageCode: 'PHONE_ISEXIST_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const date = new Date();
      date.setHours(date.getHours() + 7);
      const phoneVerify = await this.verifyRepository.findOne({
        where: {
          phone: phoneNumber,
          expireAt: LessThan(date),
        },
      });
      if (phoneVerify) {
        throw new HttpException(
          {
            messageCode: 'SMS_SEND_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      date.setMinutes(date.getMinutes() + 5);
      const randomID = Math.floor(100000 + Math.random() * 900000);
      await this.verifyRepository.save({
        phone: phoneNumber,
        verifyID: randomID.toString(),
        expireAt: date,
      });
      const convertPhone = convertPhoneNumber(phoneNumber);
      const client = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);
      await client.messages.create({
        body: `Mã xác minh của bạn là ${randomID}`,
        to: convertPhone,
        from: `${process.env.PHONE}`,
      });
      const message = await this.messageService.getMessage('SMS_SEND_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      let message = '';
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

  async verify(phoneNumber: string, verifyID: string) {
    try {
      if (verifyID.length < 6) {
        throw new HttpException(
          {
            messageCode: 'VERIFY_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!isNumberic(verifyID)) {
        throw new HttpException(
          {
            messageCode: 'VERIFY_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const date = new Date();
      date.setHours(date.getHours() - 3);
      const phoneVerify = await this.verifyRepository.findOne({
        where: {
          phone: phoneNumber,
          verifyID: verifyID,
        },
      });
      if (!phoneVerify) {
        throw new HttpException(
          {
            messageCode: 'VERIFY_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (phoneVerify.expireAt <= date) {
        console.log(phoneVerify);
        throw new HttpException(
          {
            messageCode: 'VERIFY_ERROR3',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const phoneList = await this.verifyRepository.find({
        where: {
          phone: phoneNumber,
        },
      });
      for (const phone of phoneList) {
        await this.verifyRepository.delete(phone.id);
      }
      const message = await this.messageService.getMessage('VERIFY_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      let message = '';
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

  async changePassword(@Request() req, item: ChangePassword) {
    try {
      const account = await this.accountRepository.findOne({
        where: {
          phone: Like('%' + req.user.phone + '%'),
        },
      });
      if (!(await bcrypt.compare(item.oldPassword, account.password))) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PASSWORD_ERROR5',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (item.newPassword == item.oldPassword) {
        throw new HttpException(
          {
            messageCode: 'CHANGE_PASSWORD_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(item.newPassword, salt);
      await this.accountRepository.update(account.id, {
        password: hashPassword,
      });
      const message = await this.messageService.getMessage(
        'CHANGE_PASSWORD_SUCCESS',
      );
      return {
        message: message,
      };
    } catch (error) {
      console.log(error);
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

  async forgotPassword(item: ChangePassword) {
    try {
      const account = await this.accountRepository.findOne({
        where: {
          phone: Like('%' + item.phone + '%'),
        },
      });
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(item.newPassword, salt);
      await this.accountRepository.update(account.id, {
        password: hashPassword,
      });
      const message = await this.messageService.getMessage(
        'FORGOT_PASSWORD_SUCCESS',
      );
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
      await this.accountRepository.update(req.user.id, {
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
