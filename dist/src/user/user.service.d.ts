import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MessageService } from '../common/lib';
export declare class UserService {
    readonly userRepository: Repository<User>;
    private readonly messageService;
    constructor(userRepository: Repository<User>, messageService: MessageService);
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<any>;
    getProfile(req: any): Promise<{
        data: {
            id: number;
            name: string;
            phone: string;
            address: string;
            photo: string;
        };
    } | {
        data: User;
    }>;
    findOne(id: number): Promise<string>;
    update(req: any, updateUserDto: UpdateUserDto): Promise<void>;
    remove(id: number): string;
}
