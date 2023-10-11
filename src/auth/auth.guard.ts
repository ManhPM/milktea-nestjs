import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { MessageService } from 'src/common/lib';

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
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      if (payload.account.role === 0) {
        request['user'] = Object(payload.account.user);
        request['role'] = Object(payload.account.role);
      } else {
        request['user'] = Object(payload.account.staff);
        request['role'] = Object(payload.account.role);
      }
    } catch {
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
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
