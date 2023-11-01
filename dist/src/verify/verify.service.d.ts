import { CreateVerifyDto } from './dto/create-verify.dto';
import { UpdateVerifyDto } from './dto/update-verify.dto';
export declare class VerifyService {
    create(createVerifyDto: CreateVerifyDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVerifyDto: UpdateVerifyDto): string;
    remove(id: number): string;
}
