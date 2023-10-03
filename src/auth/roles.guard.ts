import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const role = request.role;
    if (roles.includes(role.toString())) {
      return true;
    }
    throw new HttpException(
      {
        message: 'Bạn không có quyền sử dụng chức năng',
      },
      403,
    );
  }
}
