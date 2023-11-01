import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './entities/staff.entity';
import { DataSource, Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { MessageService } from '../common/lib';
export declare class StaffService {
    readonly staffRepository: Repository<Staff>;
    readonly accountRepository: Repository<Account>;
    private dataSource;
    private readonly messageService;
    constructor(staffRepository: Repository<Staff>, accountRepository: Repository<Account>, dataSource: DataSource, messageService: MessageService);
    create(item: CreateStaffDto): Promise<{
        message: any;
    }>;
    checkExist(id: number): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<{
        data: Staff;
    }>;
    update(id: number, item: UpdateStaffDto): Promise<{
        message: any;
    }>;
    remove(id: number): Promise<{
        message: any;
    }>;
}
