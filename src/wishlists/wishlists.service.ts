import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist) private tourRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto) {
    return 'This action adds a new wishlist';
  }

  // async findAll(query: FilterTourDto): Promise<any> {
  //   const availableSeats = Number(query.availableSeats) || 1;
  //   const page = Number(query.page) || 1;

  //   const skip = (page - 1) * 8;

  //   let res = [];
  //   let total = 0;

  //   [res, total] = await this.tourRepository.findAndCount({
  //     where: [
  //       {
  //         availableSeats: MoreThanOrEqual(availableSeats),
  //       },
  //     ],
  //     order: { price: 'ASC' },
  //     take: 8,
  //     skip: skip,
  //   });
  //   return {
  //     data: res,
  //     total,
  //   };
  //   return 'getall';
  // }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
