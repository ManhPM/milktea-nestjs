import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<{
        data: {
            id: number;
            name: string;
            phone: string;
            address: string;
            photo: string;
        };
    } | {
        data: import("./entities/user.entity").User;
    }>;
    findAll(): Promise<any>;
    update(req: any, updateUserDto: UpdateUserDto): Promise<void>;
}
