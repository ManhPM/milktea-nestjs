import { Injectable, Request } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    readonly wishlistRepository: Repository<Wishlist>,
  ) {}
  create(createWishlistDto: CreateWishlistDto) {
    return 'This action adds a new wishlist';
  }

  async findAll(@Request() req): Promise<any> {
    const [res, total] = await this.wishlistRepository.findAndCount({
      where: {
        user: req.user.id,
      },
      relations: ['product', 'product.recipe'],
    });
    return {
      data: res,
      total,
    };
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
