import { Staff } from '../../staff/entities/staff.entity';
import { User } from '../../user/entities/user.entity';
export declare class Account {
    id: number;
    phone: string;
    password: string;
    role: number;
    user: User;
    staff: Staff;
}
