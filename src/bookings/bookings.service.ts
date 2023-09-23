import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { FilterBookingDto } from './dto/filter-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async findAll(query: FilterBookingDto): Promise<any> {
    const page = Number(query.page) || 1;
    const status = Number(query.status);

    const skip = (page - 1) * 8;

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
