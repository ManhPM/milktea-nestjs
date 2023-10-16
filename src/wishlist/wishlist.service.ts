import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { MessageService } from 'src/common/lib';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
    @InjectRepository(Recipe)
    readonly recipeRepository: Repository<Recipe>,
    private readonly messageService: MessageService,
  ) {}
  async create(id: number, @Request() req) {
    try {
      const item = await this.wishlistRepository.findOne({
        where: {
          user: Like('%' + req.user[0].id + '%'),
          recipe: Like('%' + id + '%'),
        },
        relations: ['user', 'recipe'],
      });
      if (item) {
        await this.wishlistRepository.delete({
          user: item.user,
          recipe: item.recipe,
        });
        const message = await this.messageService.getMessage(
          'ADD_TO_WISHLIST_SUCCESS',
        );
        return {
          message: message,
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
        const message = await this.messageService.getMessage(
          'DELETE_FROM_WISHLIST_SUCCESS',
        );
        return {
          message: message,
        };
      }
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(@Request() req): Promise<any> {
    try {
      const [res, total] = await this.wishlistRepository.findAndCount({
        where: {
          user: Like('%' + req.user[0].id + '%'),
        },
        relations: ['recipe'],
      });
      if (res[0]) {
        const data = [res[0].recipe];
        for (let i = 0; i < res.length; i++) {
          data[i] = res[i].recipe;
        }
        return {
          data: data,
        };
      }
      return {
        data: res,
      };
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
