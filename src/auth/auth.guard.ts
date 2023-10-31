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
    try {
      if (!token) {
        throw new HttpException(
          {
            messageCode: 'UNAUTHORIZED',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
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
          accountId: 0,
        };
        data.id = payload.account.staff[0].id;
        data.name = payload.account.staff[0].name;
        data.phone = payload.account.phone;
        data.accountId = payload.account.id;
        request['user'] = data;
        request['role'] = Object(payload.account.role);
      }
    } catch (error) {
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        console.log(error);
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
