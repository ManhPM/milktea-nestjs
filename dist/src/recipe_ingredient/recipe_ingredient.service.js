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
exports.RecipeIngredientService = void 0;
const common_1 = require("@nestjs/common");
const recipe_ingredient_entity_1 = require("./entities/recipe_ingredient.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lib_1 = require("../common/lib");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
const ingredient_entity_1 = require("../ingredient/entities/ingredient.entity");
let RecipeIngredientService = class RecipeIngredientService {
    constructor(recipeIngredientRepository, recipeRepository, ingredientRepository, messageService) {
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.messageService = messageService;
    }
    async create(item) {
        try {
            if (!item.ingredientId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_INGREDIENT_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!item.recipeId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_RECIPE_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!item.quantity) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_QUANTITY_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const ingredient = await this.ingredientRepository.findOne({
                where: {
                    id: item.ingredientId,
                },
            });
            const recipe = await this.recipeRepository.findOne({
                where: {
                    id: item.recipeId,
                },
            });
            if (!recipe) {
                throw new common_1.HttpException({
                    messageCode: 'RECIPE_NOTFOUND',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!ingredient) {
                throw new common_1.HttpException({
                    messageCode: 'INGREDIENT_NOTFOUND',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const check = await this.recipeIngredientRepository.findOne({
                where: {
                    ingredient: (0, typeorm_2.Like)(item.ingredientId),
                    recipe: (0, typeorm_2.Like)(item.recipeId),
                },
            });
            if (check) {
                await this.recipeIngredientRepository.update(check.id, {
                    quantity: item.quantity + check.quantity,
                });
            }
            await this.recipeIngredientRepository.save({
                ingredient,
                recipe,
                quantity: item.quantity,
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
    findOne(id) {
        return `This action returns a #${id} recipeIngredient`;
    }
    async update(item) {
        try {
            if (!item.ingredientId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_INGREDIENT_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!item.recipeId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_RECIPE_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!item.quantity) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_QUANTITY_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const recipeIngredient = await this.recipeIngredientRepository.findOne({
                where: {
                    recipe: (0, typeorm_2.Like)(item.recipeId),
                    ingredient: (0, typeorm_2.Like)(item.ingredientId),
                },
            });
            if (recipeIngredient) {
                await this.recipeIngredientRepository.update(recipeIngredient.id, {
                    quantity: item.quantity,
                });
                const message = await this.messageService.getMessage('UPDATE_SUCCESS');
                return {
                    message: message,
                };
            }
            else {
                throw new common_1.HttpException({
                    messageCode: 'IS_NOT_EXIST_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
    async remove(item) {
        try {
            if (!item.ingredientId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_INGREDIENT_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!item.recipeId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_RECIPE_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const check = await this.recipeIngredientRepository.findOne({
                where: {
                    ingredient: (0, typeorm_2.Like)(item.ingredientId),
                    recipe: (0, typeorm_2.Like)(item.recipeId),
                },
            });
            if (!check) {
                throw new common_1.HttpException({
                    messageCode: 'IS_NOT_EXIST_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            await this.recipeIngredientRepository.delete(check.id);
            const message = await this.messageService.getMessage('DELETE_SUCCESS');
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
exports.RecipeIngredientService = RecipeIngredientService;
exports.RecipeIngredientService = RecipeIngredientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_ingredient_entity_1.RecipeIngredient)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(2, (0, typeorm_1.InjectRepository)(ingredient_entity_1.Ingredient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        lib_1.MessageService])
], RecipeIngredientService);
//# sourceMappingURL=recipe_ingredient.service.js.map