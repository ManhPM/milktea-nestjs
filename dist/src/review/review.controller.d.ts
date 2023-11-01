import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(createReviewDto: CreateReviewDto, req: any): Promise<{
        message: any;
    }>;
    getAllReviewOfRecipe(id: string): Promise<{
        data: import("./entities/review.entity").Review[];
        total: number;
    }>;
}
