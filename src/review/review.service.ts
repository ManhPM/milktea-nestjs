import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { InvoiceProduct } from 'src/invoice_product/entities/invoice_product.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { MessageService } from 'src/common/lib';

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
    private readonly messageService: MessageService,
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
      const message = await this.messageService.getMessage('RATING_SUCCESS');
      return {
        message: message,
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
            messageCode: 'CREATE_REVIEW_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
