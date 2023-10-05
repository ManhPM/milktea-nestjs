import { HttpException, Injectable, Request } from '@nestjs/common';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
    @InjectRepository(Recipe)
    readonly recipeRepository: Repository<Recipe>,
  ) {}
  async create(id: number, @Request() req) {
    try {
      const item = await this.wishlistRepository.findOne({
        where: {
          user: req.user[0].id,
          recipe: Like('%' + id + '%'),
        },
        relations: ['user', 'recipe'],
      });
      if (item) {
        await this.wishlistRepository.delete({
          user: item.user,
          recipe: item.recipe,
        });
        return {
          message: 'Đã xoá sản phẩm khỏi danh sách yêu thích',
        };
      } else {
        const user = await this.userRepository.findOne({
          where: {
            id: req.user[0].id,
          },
        });
        const recipe = await this.recipeRepository.findOne({
          where: {
            id: id,
          },
        });
        await this.wishlistRepository.save({
          user: user,
          recipe: recipe,
        });
        return {
          message: 'Đã thêm sản phẩm khỏi danh sách yêu thích',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi thêm sản phẩm vào danh sách yêu thích',
          error: error.message,
        },
        500,
      );
    }
  }

  async findAll(@Request() req): Promise<any> {
    try {
      const [res, total] = await this.wishlistRepository.findAndCount({
        where: {
          user: req.user[0].id,
        },
        relations: ['recipe'],
      });
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách yêu thích của khách hàng',
          error: error.message,
        },
        500,
      );
    }
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
