import { Injectable } from '@nestjs/common';
import { Between, Like, Repository, MoreThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterTourDto } from './dto/filter-tour.dto';
import { Tour } from './entities/tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour) private tourRepository: Repository<Tour>,
  ) {}

  async search(query: FilterTourDto): Promise<any> {
    const availableSeats = Number(query.availableSeats) || 1;
    const page = Number(query.page) || 1;
    const category = query.category;
    const minDuration = query.minDuration || undefined;
    const maxDuration = query.maxDuration || undefined;
    const keyword = query.keyword || undefined;

    const skip = (page - 1) * 8;

    let res = [];
    let total = 0;

    if (keyword) {
      if (category) {
        if (minDuration && maxDuration) {
          [res, total] = await this.tourRepository.findAndCount({
            where: [
              {
                tourName: Like('%' + keyword + '%'),
                availableSeats: MoreThanOrEqual(availableSeats),
                category: Like('%' + category + '%'),
                startDate: Between(minDuration, maxDuration),
              },
            ],
            order: { price: 'ASC' },
            take: 8,
            skip: skip,
          });
        } else {
          [res, total] = await this.tourRepository.findAndCount({
            where: [
              {
                tourName: Like('%' + keyword + '%'),
                availableSeats: MoreThanOrEqual(availableSeats),
                category: Like('%' + category + '%'),
              },
            ],
            order: { price: 'ASC' },
            take: 8,
            skip: skip,
          });
        }
      } else {
        if (minDuration && maxDuration) {
          [res, total] = await this.tourRepository.findAndCount({
            where: [
              {
                tourName: Like('%' + keyword + '%'),
                availableSeats: MoreThanOrEqual(availableSeats),
                startDate: Between(minDuration, maxDuration),
              },
            ],
            order: { price: 'ASC' },
            take: 8,
            skip: skip,
          });
        } else {
          [res, total] = await this.tourRepository.findAndCount({
            where: [
              {
                tourName: Like('%' + keyword + '%'),
                availableSeats: MoreThanOrEqual(availableSeats),
              },
            ],
            order: { price: 'ASC' },
            take: 8,
            skip: skip,
          });
        }
      }
    } else {
      if (category) {
        if (minDuration && maxDuration) {
          [res, total] = await this.tourRepository.findAndCount({
            where: [
              {
                availableSeats: MoreThanOrEqual(availableSeats),
                category: Like('%' + category + '%'),
                startDate: Between(minDuration, maxDuration),
              },
            ],
            order: { price: 'ASC' },
            take: 8,
            skip: skip,
          });
        } else {
          [res, total] = await this.tourRepository.findAndCount({
            where: [
              {
                availableSeats: MoreThanOrEqual(availableSeats),
                category: Like('%' + category + '%'),
              },
            ],
            order: { price: 'ASC' },
            take: 8,
            skip: skip,
          });
        }
      } else {
        if (minDuration && maxDuration) {
          [res, total] = await this.tourRepository.findAndCount({
            where: [
              {
                availableSeats: MoreThanOrEqual(availableSeats),
                startDate: Between(minDuration, maxDuration),
              },
            ],
            order: { price: 'ASC' },
            take: 8,
            skip: skip,
          });
        } else {
          [res, total] = await this.tourRepository.findAndCount({
            where: [
              {
                availableSeats: MoreThanOrEqual(availableSeats),
              },
            ],
            order: { price: 'ASC' },
            take: 8,
            skip: skip,
          });
        }
      }
    }
    return {
      data: res,
      total,
    };
  }

  async findAll(query: FilterTourDto): Promise<any> {
    const availableSeats = Number(query.availableSeats) || 1;
    const page = Number(query.page) || 1;

    const skip = (page - 1) * 8;

    let res = [];
    let total = 0;

    [res, total] = await this.tourRepository.findAndCount({
      where: [
        {
          availableSeats: MoreThanOrEqual(availableSeats),
        },
      ],
      order: { price: 'ASC' },
      take: 8,
      skip: skip,
    });
    return {
      data: res,
      total,
    };
  }

  async findOne(id: number): Promise<Tour> {
    return await this.tourRepository.findOne({
      where: { id },
      relations: ['guide', 'category'],
    });
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }

  create(createTourDto: CreateTourDto) {
    return 'This action adds a new wishlist';
  }
  update(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} wishlist`;
  }
}
