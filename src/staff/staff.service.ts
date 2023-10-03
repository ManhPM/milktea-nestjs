import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { DataSource, Like, Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    readonly staffRepository: Repository<Staff>,
    @InjectRepository(Account)
    readonly accountRepository: Repository<Account>,
    private dataSource: DataSource,
  ) {}
  async create(item: CreateStaffDto) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(item.password, salt);
      item.password = hashPassword;
      item.isActive = 1;
      const account = await this.accountRepository.save({
        ...item,
      });
      await this.staffRepository.save({
        ...item,
        account,
      });
      return {
        message: 'Tạo mới thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi tạo mới nhân viên',
        },
        500,
      );
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.staffRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra tồn tại nhân viên',
        },
        500,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách nhân viên',
        },
        500,
      );
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.staffRepository.findOne({
        where: {
          id: id,
        },
        relations: ['account'],
      });
      delete res.account.password;
      return {
        data: res,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi tìm kiếm thông tin nhân viên',
        },
        500,
      );
    }
  }

  async update(id: number, item: UpdateStaffDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const staff = await this.staffRepository.findOne({
        where: {
          id: id,
        },
        relations: ['account'],
      });
      await queryRunner.manager.update(Staff, id, {
        name: item.name,
        address: item.address,
        gender: item.gender,
        birthday: item.birthday,
        hiredate: item.hiredate,
        isActive: item.isActive,
        account: staff.account,
      });
      if (item.phone || item.password || item.role) {
        if (item.password) {
          const salt = bcrypt.genSaltSync(10);
          const hashPassword = await bcrypt.hash(item.password, salt);
          item.password = hashPassword;
        }
        await queryRunner.manager.update(Account, staff.account.id, {
          password: item.password,
          phone: item.phone,
          role: item.role,
        });
      }
      await queryRunner.commitTransaction();
      return {
        message: 'Cập nhật thành công',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          message: 'Lỗi cập nhật nhân viên',
        },
        500,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    try {
      await this.staffRepository.update(id, {
        isActive: 0,
      });
      return {
        message: 'Xoá thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi xoá nhân viên',
        },
        500,
      );
    }
  }
}
