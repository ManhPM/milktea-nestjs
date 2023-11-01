import { VerifyService } from './verify.service';
import { CreateVerifyDto } from './dto/create-verify.dto';
import { UpdateVerifyDto } from './dto/update-verify.dto';
export declare class VerifyController {
    private readonly verifyService;
    constructor(verifyService: VerifyService);
    create(createVerifyDto: CreateVerifyDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateVerifyDto: UpdateVerifyDto): string;
    remove(id: string): string;
}
