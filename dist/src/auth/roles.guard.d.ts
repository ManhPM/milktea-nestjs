import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MessageService } from '../common/lib';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private readonly messageService;
    constructor(reflector: Reflector, messageService: MessageService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
