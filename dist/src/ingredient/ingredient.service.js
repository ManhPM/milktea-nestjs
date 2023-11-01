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
exports.IngredientService = void 0;
const common_1 = require("@nestjs/common");
const ingredient_entity_1 = require("./entities/ingredient.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lib_1 = require("../common/lib");
const recipe_ingredient_entity_1 = require("../recipe_ingredient/entities/recipe_ingredient.entity");
let IngredientService = class IngredientService {
    constructor(ingredientRepository, recipeIngredientRepository, messageService) {
        this.ingredientRepository = ingredientRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.messageService = messageService;
    }
    async checkCreate(name, unitName) {
        try {
            return await this.ingredientRepository.findOne({
                where: {
                    name: name,
                    unitName: unitName,
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
    async create(item) {
        try {
            item.isActive = 1;
            item.quantity = 0;
            await this.ingredientRepository.save({
                ...item,
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
    async update(id, updateIngredientDto) {
        try {
            await this.ingredientRepository.update(id, {
                name: updateIngredientDto.name,
                image: updateIngredientDto.image,
                unitName: updateIngredientDto.unitName,
            });
            const message = await this.messageService.getMessage('UPDATE_SUCCESS');
            return {
                message: message,
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
    async remove(id) {
        try {
            const check = await await this.recipeIngredientRepository.findOne({
                where: {
                    ingredient: (0, typeorm_2.Like)(id),
                    recipe: {
                        isActive: (0, typeorm_2.Not)(0),
                    },
                },
                relations: ['recipe'],
            });
            if (check) {
                throw new common_1.HttpException({
                    messageCode: 'DELETE_INGREDIENT_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const ingredient = await this.ingredientRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (ingredient.isActive == 1) {
                await this.ingredientRepository.update(id, {
                    isActive: 0,
                });
                const message = await this.messageService.getMessage('DELETE_SUCCESS');
                return {
                    message: message,
                };
            }
            else {
                await this.ingredientRepository.update(id, {
                    isActive: 1,
                });
                const message = await this.messageService.getMessage('UNDELETE_INGREDIENT_SUCCESS');
                return {
                    message: message,
                };
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
    async findAll(query) {
        try {
            const name = query.name;
            let res = [];
            if (name) {
                const res1 = await this.ingredientRepository.find({
                    where: {
                        name,
                        isActive: 1,
                    },
                });
                const res2 = await this.ingredientRepository.find({
                    where: {
                        name,
                        isActive: 2,
                    },
                });
                const res0 = await this.ingredientRepository.find({
                    where: {
                        name,
                        isActive: 0,
                    },
                });
                res = [...res1, ...res2, ...res0];
            }
            else {
                const res1 = await this.ingredientRepository.find({
                    where: {
                        isActive: 1,
                    },
                });
                const res2 = await this.ingredientRepository.find({
                    where: {
                        isActive: 2,
                    },
                });
                const res0 = await this.ingredientRepository.find({
                    where: {
                        isActive: 0,
                    },
                });
                res = [...res1, ...res2, ...res0];
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
    async findOne(id) {
        try {
            const res = await this.ingredientRepository.findOne({
                where: {
                    id: id,
                },
            });
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
    async checkExist(id) {
        try {
            return await this.ingredientRepository.findOne({
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
};
exports.IngredientService = IngredientService;
exports.IngredientService = IngredientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ingredient_entity_1.Ingredient)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_ingredient_entity_1.RecipeIngredient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        lib_1.MessageService])
], IngredientService);
//# sourceMappingURL=ingredient.service.js.map