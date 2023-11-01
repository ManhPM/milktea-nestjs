import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
export declare class TypeController {
    private readonly typeService;
    constructor(typeService: TypeService);
    create(createTypeDto: CreateTypeDto): Promise<{
        message: any;
    }>;
    findAll(): Promise<any>;
    update(id: string, updateTypeDto: UpdateTypeDto): Promise<{
        message: any;
    }>;
}
