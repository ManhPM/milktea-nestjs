import { Injectable, Request, Body } from '@nestjs/common';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(id: number, @Body() req) {
    const item = await this.wishlistRepository.findOne({
      where: {
        tour: Like('%' + id + '%'),
        user: req.user.userInfo.id,
      },
    });
    if (!item) {
      await this.wishlistRepository.save({
        user: req.user.userInfo.id,
        tourId: id,
      });
    } else {
      await this.wishlistRepository
        .createQueryBuilder()
        .delete()
        .from(Wishlist)
        .where('user = :user', { user: req.user.userInfo.id })
        .andWhere('tourId = :tourId', { tourId: id })
        .execute();
    }

    return {
      message: '',
    };
  }

  async findAll(userId: number): Promise<any> {
    const data = await this.wishlistRepository.find({
      where: {
        user: Like('%' + userId + '%'),
      },
      relations: ['user', 'tour'],
    });
    return {
      data: data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
