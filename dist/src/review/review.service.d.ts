import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { InvoiceProduct } from '../invoice_product/entities/invoice_product.entity';
import { Invoice } from '../invoice/entities/invoice.entity';
import { MessageService } from '../common/lib';
export declare class ReviewService {
    readonly reviewRepository: Repository<Review>;
    readonly userRepository: Repository<User>;
    readonly recipeRepository: Repository<Recipe>;
    readonly invoiceProductRepository: Repository<InvoiceProduct>;
    readonly invoiceRepository: Repository<Invoice>;
    private readonly messageService;
    constructor(reviewRepository: Repository<Review>, userRepository: Repository<User>, recipeRepository: Repository<Recipe>, invoiceProductRepository: Repository<InvoiceProduct>, invoiceRepository: Repository<Invoice>, messageService: MessageService);
    create(createReviewDto: CreateReviewDto, req: any): Promise<{
        message: any;
    }>;
    findOne(id: number): Promise<{
        data: Review[];
        total: number;
    }>;
    checkCreate(id_order: number, id: number): Promise<InvoiceProduct>;
}
