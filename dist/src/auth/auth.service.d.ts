import { MailerService } from '@nestjs-modules/mailer';
import { Account } from '../account/entities/account.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from '../account/dto/create-account.dto.js';
import { UpdateAccountDto } from '../account/dto/update-account.dto';
import { MessageService } from '../common/lib';
import { Verify } from '../verify/entities/verify.entity';
import { ChangePassword } from '../user/dto/changepassword.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    readonly accountRepository: Repository<Account>;
    readonly userRepository: Repository<User>;
    readonly verifyRepository: Repository<Verify>;
    private readonly mailerService;
    private jwtService;
    private readonly messageService;
    constructor(accountRepository: Repository<Account>, userRepository: Repository<User>, verifyRepository: Repository<Verify>, mailerService: MailerService, jwtService: JwtService, messageService: MessageService);
    sendSms(phoneNumber: string): Promise<void>;
    verify(phoneNumber: string, verifyID: string): Promise<{
        message: any;
    }>;
    changePassword(req: any, item: ChangePassword): Promise<{
        message: any;
    }>;
    forgotPassword(item: ChangePassword): Promise<{
        message: any;
    }>;
    create(createAccountDto: CreateAccountDto): Promise<{
        message: any;
    }>;
    update(req: any, updateAccountDto: UpdateAccountDto, response: any): Promise<{
        message: any;
    }>;
    findOne(phone: string): Promise<any>;
    checkCreatePhone(phone: string): Promise<any>;
    checkExistPhone(phone: string): Promise<any>;
}
