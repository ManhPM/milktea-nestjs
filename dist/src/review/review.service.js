"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const create_review_dto_1 = require("./dto/create-review.dto");
const review_entity_1 = require("./entities/review.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
const invoice_product_entity_1 = require("../invoice_product/entities/invoice_product.entity");
const invoice_entity_1 = require("../invoice/entities/invoice.entity");
const lib_1 = require("../common/lib");
let ReviewService = class ReviewService {
    constructor(reviewRepository, userRepository, recipeRepository, invoiceProductRepository, invoiceRepository, messageService) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.invoiceProductRepository = invoiceProductRepository;
        this.invoiceRepository = invoiceRepository;
        this.messageService = messageService;
    }
    async create(createReviewDto, req) {
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
                    invoice: (0, typeorm_2.Like)(createReviewDto.invoiceId),
                    product: (0, typeorm_2.Like)(createReviewDto.productId),
                },
                relations: ['product.product_recipes.recipe'],
            });
            if (invoiceProducts) {
                if (!invoiceProducts.isReviewed) {
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
                }
                else {
                    throw new common_1.HttpException({
                        messageCode: 'INVOICE_PRODUCT_RATED_ERROR',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                throw new common_1.HttpException({
                    messageCode: 'INVOICE_PRODUCT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async findOne(id) {
        try {
            const [res, total] = await this.reviewRepository.findAndCount({
                where: {
                    recipe: (0, typeorm_2.Like)(id),
                },
                relations: ['user', 'recipe'],
                order: {
                    date: 'DESC',
                },
            });
            return {
                data: res,
                total,
            };
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async checkCreate(id_order, id) {
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
                    product: (0, typeorm_2.Like)(id),
                    isReviewed: 0,
                },
            });
            if (invoice && invoiceProduct) {
                return invoiceProduct;
            }
            else {
                throw new common_1.HttpException({
                    messageCode: 'CREATE_REVIEW_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.ReviewService = ReviewService;
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto, Object]),
    __metadata("design:returntype", Promise)
], ReviewService.prototype, "create", null);
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(3, (0, typeorm_1.InjectRepository)(invoice_product_entity_1.InvoiceProduct)),
    __param(4, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        lib_1.MessageService])
], ReviewService);
//# sourceMappingURL=review.service.js.map