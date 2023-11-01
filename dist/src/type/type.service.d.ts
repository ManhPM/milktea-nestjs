import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';
import { MessageService } from '../common/lib';
export declare class TypeService {
    readonly typeRepository: Repository<Type>;
    private readonly messageService;
    constructor(typeRepository: Repository<Type>, messageService: MessageService);
    create(createTypeDto: CreateTypeDto): Promise<{
        message: any;
    }>;
    checkExist(id: number): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): string;
    checkCreate(name: string): Promise<Type>;
    update(id: number, updateTypeDto: UpdateTypeDto): Promise<{
        message: any;
    }>;
    remove(id: number): string;
}
