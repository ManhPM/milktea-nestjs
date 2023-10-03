import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { InvoiceProduct } from 'src/invoice_product/entities/invoice_product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Recipe, Invoice, InvoiceProduct]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
