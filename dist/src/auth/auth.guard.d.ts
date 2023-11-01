import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessageService } from '../common/lib';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private readonly messageService;
    constructor(jwtService: JwtService, messageService: MessageService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
