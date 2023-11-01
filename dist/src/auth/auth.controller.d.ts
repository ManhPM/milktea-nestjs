import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { UpdateAccountDto } from '../account/dto/update-account.dto';
import { MessageService } from '../common/lib';
import { ChangePassword } from '../user/dto/changepassword.dto';
export declare class AuthController {
    private readonly authService;
    private jwtService;
    private readonly messageService;
    constructor(authService: AuthService, jwtService: JwtService, messageService: MessageService);
    uploadFile(file: any): Promise<{
        url: string;
        message?: undefined;
    } | {
        message: any;
        url?: undefined;
    }>;
    checkPhone(phone: string): Promise<any>;
    refreshToken(req: any, response: Response): Promise<{
        userInfo: {
            phone: string;
            accountId: number;
            userId: number;
            role: number;
            name: string;
            address: string;
            photo: string;
        };
    }>;
    login(phone: string, loginPassword: string, response: Response): Promise<{
        userInfo: {
            phone: string;
            accountId: number;
            userId: number;
            role: number;
            name: string;
            address: string;
            photo: string;
        };
        message: any;
    }>;
    logout(response: Response): Promise<{
        message: any;
    }>;
    changePassword(req: any, item: ChangePassword): Promise<any>;
    forgotPassword(item: ChangePassword): Promise<any>;
    register(item: CreateAccountDto): Promise<any>;
    sendSMS(phone: string): Promise<any>;
    verify(phone: string, verifyID: string): Promise<any>;
    update(req: any, item: UpdateAccountDto, response: Response): Promise<any>;
}
