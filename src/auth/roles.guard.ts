import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MessageService } from 'src/common/lib';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly messageService: MessageService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const role = request.role;
    if (roles.includes(role.toString())) {
      return true;
    }
    const message = await this.messageService.getMessage('FORBIDDEN');
    throw new HttpException(
      {
        message: message,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
