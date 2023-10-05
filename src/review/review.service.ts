import { HttpException, Injectable, Request } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { InvoiceProduct } from 'src/invoice_product/entities/invoice_product.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
    @InjectRepository(Recipe)
    readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(InvoiceProduct)
    readonly invoiceProductRepository: Repository<InvoiceProduct>,
    @InjectRepository(Invoice)
    readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async create(createReviewDto: CreateReviewDto, @Request() req) {
    try {
      const date = new Date();
      date.setHours(date.getHours() + 7);
      createReviewDto.date = date;
      if (!createReviewDto.image) {
        createReviewDto.image =
          'https://ipos.vn/wp-content/uploads/2023/04/tra-sua-dam-vi-3.png';
      }
      const user = await this.userRepository.findOne({
        where: {
          id: req.user.id,
        },
      });
      const invoiceProducts = await this.invoiceProductRepository.findOne({
        where: {
          invoice: Like('%' + createReviewDto.invoiceId + '%'),
          product: Like('%' + createReviewDto.productId + '%'),
        },
        relations: ['product.product_recipes.recipe'],
      });
      const recipe = await this.recipeRepository.findOne({
        where: {
          id: invoiceProducts.product.product_recipes[0].recipe.id,
        },
      });
      await this.reviewRepository.save({
        ...createReviewDto,
        user,
        recipe,
      });
      await this.invoiceProductRepository.update(invoiceProducts.id, {
        isReviewed: 1,
      });
      return {
        message: 'Đánh giá thành công',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi đánh giá',
          error: error.message,
        },
        500,
      );
    }
  }

  async findOne(id: number) {
    try {
      const [res, total] = await this.reviewRepository.findAndCount({
        where: {
          recipe: Like('%' + id + '%'),
        },
        relations: ['user', 'recipe'],
      });
      return {
        data: res,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách đánh giá của một sản phẩm',
          error: error.message,
        },
        500,
      );
    }
  }

  async checkCreate(id_order: number, id: number) {
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: {
          id: id_order,
          isPaid: 1,
          status: 3,
        },
      });
      const invoiceProduct = await this.invoiceProductRepository.findOne({
        where: {
          invoice: invoice,
          product: Like('%' + id + '%'),
          isReviewed: 0,
        },
      });
      if (invoice && invoiceProduct) {
        return invoiceProduct;
      } else {
        throw new HttpException(
          {
            message:
              'Hoá đơn chưa hoàn thành hoặc đã đánh giá trước đó. Không thể đánh giá',
          },
          400,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra khi tạo mới đánh giá',
          error: error.message,
        },
        500,
      );
    }
  }
}
