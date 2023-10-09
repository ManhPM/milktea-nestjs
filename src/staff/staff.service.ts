import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { DataSource, Like, Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';
import { getMessage } from 'src/common/lib';

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
      const message = await getMessage('CREATE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.staffRepository.findOne({
        where: { id },
      });
    } catch (error) {
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await getMessage('UPDATE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await getMessage('DELETE_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
