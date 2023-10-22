import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { MessageService } from '../common/lib';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly messageService: MessageService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['token'];
    if (!token) {
      const message = await this.messageService.getMessage('UNAUTHORIZED');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      if (payload.account.role === 0) {
        const data = {
          id: 0,
          accountId: 0,
          name: '',
          phone: '',
          address: '',
          photo: '',
        };
        data.id = payload.account.user[0].id;
        data.name = payload.account.user[0].name;
        data.phone = payload.account.phone;
        data.accountId = payload.account.id;
        data.address = payload.account.user[0].address;
        data.photo = payload.account.user[0].photo;
        request['user'] = data;
        request['role'] = Object(payload.account.role);
      } else {
        const data = {
          id: 0,
          name: '',
          phone: '',
          address: '',
          gender: '',
          birthday: '',
          hireDate: '',
          accountId: 0,
        };
        data.id = payload.account.staff[0].id;
        data.name = payload.account.staff[0].name;
        data.phone = payload.account.phone;
        data.address = payload.account.staff[0].address;
        data.gender = payload.account.staff[0].gender;
        data.birthday = payload.account.staff[0].birthday;
        data.hireDate = payload.account.staff[0].hiredate;
        data.accountId = payload.account.id;
        request['user'] = data;
        request['role'] = Object(payload.account.role);
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
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
