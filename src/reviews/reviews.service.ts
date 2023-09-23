import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Like, Repository } from 'typeorm';
import { FilterReviewDto } from './dto/filter-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async findOne(query: FilterReviewDto, id: number): Promise<any> {
    const page = Number(query.page) || 1;
    const skip = (page - 1) * 5;

    let res = [];
    let total = 0;

    [res, total] = await this.reviewRepository.findAndCount({
      where: [
        {
          tour: Like('%' + id + '%'),
        },
      ],
      order: { created_at: 'ASC' },
      take: 5,
      skip: skip,
    });
    return {
      data: res,
      total,
    };
  }

  create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
