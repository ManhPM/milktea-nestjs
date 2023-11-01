import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
export declare class AccountService {
    readonly accountRepository: Repository<Account>;
    constructor(accountRepository: Repository<Account>);
    create(createAccountDto: CreateAccountDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAccountDto: UpdateAccountDto): string;
    remove(id: number): string;
}
