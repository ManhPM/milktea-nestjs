import { Injectable, Request } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { FilterBookingDto } from './dto/filter-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async findAllAdmin(query: FilterBookingDto): Promise<any> {
    const page = Number(query.page) || 1;
    const status = Number(query.status);

    const skip = (page - 1) * 5;

    let res = [];
    let total = 0;

    if (status) {
      [res, total] = await this.bookingRepository.findAndCount({
        where: { status },
        relations: ['user', 'tour'],
        take: 5,
        skip: skip,
        select: {
          user: {
            id: true,
            fullName: true,
            email: true,
            address: true,
            phoneNumber: true,
          },
        },
      });
    } else {
      [res, total] = await this.bookingRepository.findAndCount({
        relations: ['user', 'tour'],
        take: 5,
        skip: skip,
        select: {
          user: {
            id: true,
            fullName: true,
            email: true,
            address: true,
            phoneNumber: true,
          },
        },
      });
    }
    return {
      data: res,
      total,
    };
  }

  async findAllUser(query: FilterBookingDto, userId: number): Promise<any> {
    const page = Number(query.page) || 1;
    const status = Number(query.status);
    const skip = (page - 1) * 5;

    let res = [];
    let total = 0;

    if (status) {
      [res, total] = await this.bookingRepository.findAndCount({
        where: {
          status: status,
          user: Like('%' + userId + '%'),
        },
        relations: ['tour'],
        take: 5,
        skip: skip,
      });
    } else {
      [res, total] = await this.bookingRepository.findAndCount({
        where: {
          user: Like('%' + userId + '%'),
        },
        relations: ['tour'],
        take: 5,
        skip: skip,
      });
    }
    return {
      data: res,
      total,
    };
  }

  create(createBookingDto: CreateBookingDto) {
    return 'This action adds a new booking';
  }

  async findOne(id: number): Promise<Booking> {
    return await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'tour'],
      select: {
        user: {
          id: true,
          fullName: true,
          email: true,
          address: true,
          phoneNumber: true,
        },
      },
    });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
