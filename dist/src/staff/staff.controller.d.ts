import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    create(createStaffDto: CreateStaffDto): Promise<{
        message: any;
    }>;
    findAll(): Promise<any>;
    update(id: string, updateStaffDto: UpdateStaffDto): Promise<{
        message: any;
    }>;
    remove(id: string): Promise<{
        message: any;
    }>;
}
