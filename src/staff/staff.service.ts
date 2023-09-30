import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    readonly staffRepository: Repository<Staff>,
  ) {}
  create(createStaffDto: CreateStaffDto) {
    return 'This action adds a new staff';
  }

  async findAll(): Promise<any> {
    const [res, total] = await this.staffRepository.findAndCount({
      relations: ['account'],
      select: {
        account: {
          phone: true,
        },
      },
    });
    return {
      data: res,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
