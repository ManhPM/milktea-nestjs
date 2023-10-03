import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['token'];
    if (!token) {
      throw new HttpException(
        {
          message: 'Bạn chưa đăng nhập',
        },
        401,
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
      throw new HttpException(
        {
          message: 'Lỗi đăng nhập',
        },
        401,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
