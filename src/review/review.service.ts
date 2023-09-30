import { Injectable, Request } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto, @Request() req) {
    const date = new Date();
    date.setHours(date.getHours() + 7);
    createReviewDto.date = date;
    createReviewDto.userId = req.user.id;
    await this.reviewRepository.create(createReviewDto);
    return {
      message: 'Đánh giá thành công',
    };
  }

  async findOne(id: number) {
    const [res, total] = await this.reviewRepository.findAndCount({
      where: {
        recipe: Like('%' + id + '%'),
      },
      relations: ['user', 'product.recipe'],
    });
    return {
      data: res,
      total,
    };
  }
}
