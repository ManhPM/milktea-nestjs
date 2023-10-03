import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, User, Recipe])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
