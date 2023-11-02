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
exports.RecipeService = void 0;
const common_1 = require("@nestjs/common");
const recipe_entity_1 = require("./entities/recipe.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_recipe_entity_1 = require("../product_recipe/entities/product_recipe.entity");
const recipe_type_entity_1 = require("../recipe_type/entities/recipe_type.entity");
const type_entity_1 = require("../type/entities/type.entity");
const lib_1 = require("../common/lib");
const wishlist_entity_1 = require("../wishlist/entities/wishlist.entity");
let RecipeService = class RecipeService {
    constructor(recipeRepository, productRecipeRepository, recipeTypeRepository, wishlistRepository, typeRepository, messageService) {
        this.recipeRepository = recipeRepository;
        this.productRecipeRepository = productRecipeRepository;
        this.recipeTypeRepository = recipeTypeRepository;
        this.wishlistRepository = wishlistRepository;
        this.typeRepository = typeRepository;
        this.messageService = messageService;
    }
    async create(createRecipeDto) {
        try {
            createRecipeDto.discount = 0;
            if (!createRecipeDto.image) {
                createRecipeDto.image =
                    'https://phuclong.com.vn/uploads/dish/063555c21c4206-trviliphclong.png';
            }
            if (!createRecipeDto.info) {
                createRecipeDto.info = 'Mặc định';
            }
            createRecipeDto.isActive = 1;
            const type = await this.typeRepository.findOne({
                where: {
                    id: createRecipeDto.typeId,
                },
            });
            await this.recipeRepository.save({
                ...createRecipeDto,
                type,
            });
            const message = await this.messageService.getMessage('CREATE_SUCCESS');
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
    async getDetailRecipe(id, req) {
        try {
            const res = await this.recipeRepository.findOne({
                where: {
                    id: id,
                },
                relations: ['recipe_ingredients.ingredient', 'type'],
            });
            if (res) {
                const data = {
                    id: res.id,
                    name: res.name,
                    info: res.info,
                    image: res.image,
                    isActive: res.isActive,
                    price: res.price,
                    discount: res.discount,
                    type: res.type.id,
                    ingredients: [],
                    isLiked: 0,
                };
                for (let i = 0; i < res.recipe_ingredients.length; i++) {
                    data.ingredients[i] = res.recipe_ingredients[i].ingredient;
                    data.ingredients[i].remainQuantity =
                        res.recipe_ingredients[i].ingredient.quantity;
                    data.ingredients[i].quantity = res.recipe_ingredients[i].quantity;
                }
                const wishlist = await this.wishlistRepository.find({
                    where: {
                        user: (0, typeorm_2.Like)(req.query.id),
                    },
                    relations: ['recipe'],
                });
                let wishlistIds;
                if (wishlist[0]) {
                    wishlistIds = wishlist.map((item) => item.recipe.id);
                }
                data.isLiked = wishlistIds.includes(data.id) ? 1 : 0;
                return {
                    data: data,
                };
            }
            return {
                data: res,
            };
        }
        catch (error) {
            console.log(error);
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
    async getAllRecipe(query) {
        try {
            const keyword = query.keyword || undefined;
            let res = [];
            if (keyword) {
                res = await this.recipeRepository.find({
                    where: {
                        type: (0, typeorm_2.Not)(5),
                        name: (0, typeorm_2.Like)('%' + keyword + '%'),
                    },
                    relations: ['type'],
                });
            }
            else {
                res = await this.recipeRepository.find({
                    where: {
                        type: (0, typeorm_2.Not)(5),
                    },
                    relations: ['type'],
                });
            }
            return {
                data: res,
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
    async getRecipeByType(id, req) {
        try {
            const res1 = await this.recipeRepository.find({
                where: {
                    type: (0, typeorm_2.Like)(id),
                    isActive: (0, typeorm_2.Like)(1),
                },
            });
            const res2 = await this.recipeRepository.find({
                where: {
                    type: (0, typeorm_2.Like)(id),
                    isActive: (0, typeorm_2.Like)(2),
                },
            });
            const res0 = await this.recipeRepository.find({
                where: {
                    type: (0, typeorm_2.Like)(id),
                    isActive: (0, typeorm_2.Like)(0),
                },
            });
            const res = [...res1, ...res2, ...res0];
            const wishlist = await this.wishlistRepository.find({
                where: {
                    user: (0, typeorm_2.Like)(req.query.id),
                },
                relations: ['recipe'],
            });
            if (wishlist[0] && res[0]) {
                let wishlistIds;
                if (wishlist[0]) {
                    wishlistIds = wishlist.map((item) => item.recipe.id);
                }
                const newData = res.map((item) => {
                    return {
                        ...item,
                        isLiked: wishlistIds.includes(item.id) ? 1 : 0,
                    };
                });
                return {
                    data: newData,
                };
            }
            const newData = res.map((item) => {
                return {
                    ...item,
                    isLiked: 0,
                };
            });
            return {
                data: newData,
            };
        }
        catch (error) {
            console.log(error);
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
    async getToppingByType(id) {
        try {
            const [res, total] = await this.recipeTypeRepository.findAndCount({
                where: {
                    type: (0, typeorm_2.Like)(id),
                },
                relations: ['recipe'],
            });
            if (res[0]) {
                const data = [{}];
                let j = 0;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].recipe.isActive != 0) {
                        data[j] = res[i].recipe;
                        j++;
                    }
                }
                return {
                    data: data,
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
    async getToppingByRecipe(id) {
        try {
            const res = await this.recipeRepository.findOne({
                where: {
                    id: id,
                },
                relations: ['type.recipe_types.recipe'],
            });
            if (res) {
                const data = [{}];
                let j = 0;
                for (let i = 0; i < res.type.recipe_types.length; i++) {
                    if (res.type.recipe_types[i].recipe.isActive != 0) {
                        data[j] = res.type.recipe_types[i].recipe;
                        j++;
                    }
                }
                return {
                    data: data,
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
    async getAllTopping() {
        try {
            const [res, total] = await this.recipeRepository.findAndCount({
                where: {
                    type: (0, typeorm_2.Like)(5),
                    isActive: (0, typeorm_2.Not)(0),
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
    async getAllIngredientOfRecipe(id) {
        try {
            const res = await this.recipeRepository.findOne({
                where: {
                    id: id,
                },
                relations: ['recipe_ingredients.ingredient'],
            });
            if (res) {
                const data = [{}];
                for (let i = 0; i < res.recipe_ingredients.length; i++) {
                    data[i] = res.recipe_ingredients[i];
                }
                return {
                    data: data,
                };
            }
            return {
                data: null,
            };
        }
        catch (error) {
            console.log(error);
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
            return await this.recipeRepository.findOne({
                where: { id },
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
    async update(id, updateRecipeDto) {
        try {
            const type = await this.typeRepository.findOne({
                where: {
                    id: updateRecipeDto.typeId,
                },
            });
            const recipe = await this.recipeRepository.findOne({
                where: {
                    id: id,
                },
                relations: ['type'],
            });
            await this.recipeRepository.update(id, {
                name: updateRecipeDto.name ? updateRecipeDto.name : recipe.name,
                info: updateRecipeDto.info ? updateRecipeDto.info : recipe.info,
                image: updateRecipeDto.image ? updateRecipeDto.image : recipe.image,
                price: updateRecipeDto.price ? updateRecipeDto.price : recipe.price,
                discount: updateRecipeDto.discount
                    ? updateRecipeDto.discount
                    : recipe.discount,
            });
            if (type) {
                await this.recipeRepository.update(id, {
                    type: type,
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
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async remove(id) {
        try {
            const recipe = await this.recipeRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (recipe) {
                if (recipe.isActive != 0) {
                    await this.recipeRepository.update(id, {
                        isActive: 0,
                    });
                    const message = await this.messageService.getMessage('DELETE_SUCCESS');
                    return {
                        message: message,
                    };
                }
                else {
                    await this.recipeRepository.update(id, {
                        isActive: 1,
                    });
                    const message = await this.messageService.getMessage('UNDELETE_RECIPE_SUCCESS');
                    return {
                        message: message,
                    };
                }
            }
            else {
                throw new common_1.HttpException({
                    messageCode: 'RECIPE_NOTFOUND',
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
exports.RecipeService = RecipeService;
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RecipeService.prototype, "getDetailRecipe", null);
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RecipeService.prototype, "getRecipeByType", null);
exports.RecipeService = RecipeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(1, (0, typeorm_1.InjectRepository)(product_recipe_entity_1.ProductRecipe)),
    __param(2, (0, typeorm_1.InjectRepository)(recipe_type_entity_1.RecipeType)),
    __param(3, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __param(4, (0, typeorm_1.InjectRepository)(type_entity_1.Type)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        lib_1.MessageService])
], RecipeService);
//# sourceMappingURL=recipe.service.js.map