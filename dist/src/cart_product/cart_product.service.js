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
exports.CartProductService = void 0;
const cart_product_entity_1 = require("../cart_product/entities/cart_product.entity");
const product_recipe_entity_1 = require("../product_recipe/entities/product_recipe.entity");
const common_1 = require("@nestjs/common");
const create_cart_product_dto_1 = require("./dto/create-cart_product.dto");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const product_entity_1 = require("../product/entities/product.entity");
const user_entity_1 = require("../user/entities/user.entity");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
const lib_1 = require("../common/lib");
let CartProductService = class CartProductService {
    constructor(cartProductRepository, productRepository, productRecipeRepository, userRepository, recipeRepository, dataSource, messageService) {
        this.cartProductRepository = cartProductRepository;
        this.productRepository = productRepository;
        this.productRecipeRepository = productRecipeRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.dataSource = dataSource;
        this.messageService = messageService;
    }
    async create(createCartProductDto, req) {
        const productString = createCartProductDto.productString;
        const recipeArray = createCartProductDto.productString.split(',');
        return await this.dataSource.transaction(async (transactionalEntityManager) => {
            try {
                const user = await transactionalEntityManager
                    .getRepository(user_entity_1.User)
                    .findOne({
                    where: {
                        id: req.user.id,
                    },
                });
                let product = await transactionalEntityManager
                    .getRepository(product_entity_1.Product)
                    .findOne({
                    where: {
                        productString: productString,
                    },
                });
                if (!product) {
                    product = await transactionalEntityManager
                        .getRepository(product_entity_1.Product)
                        .save({
                        size: createCartProductDto.size,
                        productString: createCartProductDto.productString,
                    });
                    for (let i = 0; i < recipeArray.length; i++) {
                        const recipe = await transactionalEntityManager
                            .getRepository(recipe_entity_1.Recipe)
                            .findOne({
                            where: {
                                id: Number(recipeArray[i]),
                            },
                        });
                        if (i == 0) {
                            await transactionalEntityManager
                                .getRepository(product_recipe_entity_1.ProductRecipe)
                                .save({
                                isMain: 1,
                                recipe,
                                product,
                            });
                        }
                        else {
                            await transactionalEntityManager
                                .getRepository(product_recipe_entity_1.ProductRecipe)
                                .save({
                                isMain: 0,
                                recipe,
                                product,
                            });
                        }
                    }
                }
                const cartProduct = await transactionalEntityManager
                    .getRepository(cart_product_entity_1.CartProduct)
                    .findOne({
                    where: {
                        user,
                        product,
                    },
                });
                if (cartProduct) {
                    await transactionalEntityManager
                        .getRepository(cart_product_entity_1.CartProduct)
                        .update(cartProduct.id, {
                        size: createCartProductDto.size,
                        quantity: Number(cartProduct.quantity) +
                            Number(createCartProductDto.quantity),
                        product,
                        user,
                    });
                }
                else {
                    await transactionalEntityManager.getRepository(cart_product_entity_1.CartProduct).save({
                        ...createCartProductDto,
                        product,
                        user,
                    });
                }
                const message = await this.messageService.getMessage('ADD_TO_CART_SUCCESS');
                return {
                    message: message,
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
                    message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                    throw new common_1.HttpException({
                        message: message,
                    }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }
    async update(id, createCartProductDto, req) {
        const productString = createCartProductDto.productString;
        return await this.dataSource.transaction(async (transactionalEntityManager) => {
            try {
                const user = await transactionalEntityManager
                    .getRepository(user_entity_1.User)
                    .findOne({
                    where: {
                        id: req.user.id,
                    },
                });
                const product = await transactionalEntityManager
                    .getRepository(product_entity_1.Product)
                    .findOne({
                    where: {
                        productString: productString,
                    },
                });
                const currentProduct = await transactionalEntityManager
                    .getRepository(cart_product_entity_1.CartProduct)
                    .findOne({
                    where: {
                        product: (0, typeorm_1.Like)(id),
                        user: user,
                    },
                });
                const cartProduct = await transactionalEntityManager
                    .getRepository(cart_product_entity_1.CartProduct)
                    .findOne({
                    where: {
                        user: user,
                        product: product,
                    },
                });
                if (cartProduct) {
                    await transactionalEntityManager
                        .getRepository(cart_product_entity_1.CartProduct)
                        .update(cartProduct.id, {
                        size: createCartProductDto.size,
                        quantity: Number(createCartProductDto.quantity),
                    });
                }
                else {
                    await transactionalEntityManager
                        .getRepository(cart_product_entity_1.CartProduct)
                        .delete(currentProduct.id);
                    await transactionalEntityManager.getRepository(cart_product_entity_1.CartProduct).save({
                        ...createCartProductDto,
                        product,
                        user,
                    });
                }
                const message = await this.messageService.getMessage('UPDATE_SUCCESS');
                return {
                    message: message,
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
                    message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                    throw new common_1.HttpException({
                        message: message,
                    }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }
    async findAll(req) {
        try {
            const res = await this.cartProductRepository.find({
                where: {
                    user: (0, typeorm_1.Like)(req.user.id),
                },
                relations: ['product.product_recipes.recipe'],
            });
            for (let i = 0; i < res.length; i++) {
                res[i].product.product_recipes.sort((a, b) => b.isMain - a.isMain);
            }
            if (res[0]) {
                const data = [
                    {
                        id: 0,
                        productId: 0,
                        quantity: 0,
                        size: 0,
                        name: '',
                        image: '',
                        discount: 0,
                        price: 0,
                        isActive: 0,
                        toppings: [
                            {
                                id: 0,
                                name: '',
                                image: '',
                                price: 0,
                            },
                        ],
                    },
                ];
                let totalCart = 0;
                for (let i = 0; i < res.length; i++) {
                    let toppingPrice = 0;
                    data[i] = {
                        productId: res[i].product.id,
                        id: res[i].product.product_recipes[0].recipe.id,
                        quantity: res[i].quantity,
                        size: res[i].size,
                        name: res[i].product.product_recipes[0].recipe.name,
                        discount: res[i].product.product_recipes[0].recipe.discount,
                        image: res[i].product.product_recipes[0].recipe.image,
                        price: (res[i].product.product_recipes[0].recipe.price *
                            res[i].product.product_recipes[0].recipe.discount) /
                            100 +
                            res[i].size,
                        isActive: res[i].product.product_recipes[0].recipe.isActive,
                        toppings: [],
                    };
                    if (res[i].size != 0) {
                        totalCart += res[i].quantity * res[i].size;
                    }
                    for (let j = 1; j < res[i].product.product_recipes.length; j++) {
                        data[i].toppings[j - 1] = {
                            id: res[i].product.product_recipes[j].recipe.id,
                            name: res[i].product.product_recipes[j].recipe.name,
                            image: res[i].product.product_recipes[j].recipe.image,
                            price: (res[i].product.product_recipes[j].recipe.price *
                                res[i].product.product_recipes[j].recipe.discount) /
                                100,
                        };
                        totalCart +=
                            (res[i].quantity *
                                res[i].product.product_recipes[j].recipe.price *
                                res[i].product.product_recipes[j].recipe.discount) /
                                100;
                        toppingPrice +=
                            (res[i].product.product_recipes[j].recipe.price *
                                res[i].product.product_recipes[j].recipe.price) /
                                100;
                    }
                    totalCart +=
                        (res[i].quantity *
                            res[i].product.product_recipes[0].recipe.price *
                            res[i].product.product_recipes[0].recipe.discount) /
                            100;
                    data[i].price =
                        (res[i].product.product_recipes[0].recipe.price *
                            res[i].product.product_recipes[0].recipe.discount) /
                            100 +
                            res[i].size +
                            toppingPrice;
                }
                return {
                    data: data,
                    total: totalCart,
                };
            }
            return {
                data: null,
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
    async checkExist(id) {
        try {
            return await this.productRepository.findOne({
                where: {
                    id,
                },
            });
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
    findOne(id) {
        return `This action returns a #${id} cartProduct`;
    }
    async remove(id, req) {
        try {
            const item = await this.cartProductRepository.findOne({
                where: {
                    user: (0, typeorm_1.Like)(req.user.id),
                    product: (0, typeorm_1.Like)(id),
                },
                relations: ['user', 'product'],
            });
            if (!item) {
                throw new common_1.HttpException({
                    messageCode: 'CART_PRODUCT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.cartProductRepository.delete(item.id);
            const message = await this.messageService.getMessage('DELETE_FROM_CART_SUCCESS');
            return {
                message: message,
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
};
exports.CartProductService = CartProductService;
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cart_product_dto_1.CreateCartProductDto, Object]),
    __metadata("design:returntype", Promise)
], CartProductService.prototype, "create", null);
__decorate([
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_cart_product_dto_1.CreateCartProductDto, Object]),
    __metadata("design:returntype", Promise)
], CartProductService.prototype, "update", null);
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartProductService.prototype, "findAll", null);
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CartProductService.prototype, "remove", null);
exports.CartProductService = CartProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(cart_product_entity_1.CartProduct)),
    __param(1, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_2.InjectRepository)(product_recipe_entity_1.ProductRecipe)),
    __param(3, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_2.InjectRepository)(recipe_entity_1.Recipe)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource,
        lib_1.MessageService])
], CartProductService);
//# sourceMappingURL=cart_product.service.js.map