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
exports.RecipeTypeService = void 0;
const common_1 = require("@nestjs/common");
const recipe_type_entity_1 = require("./entities/recipe_type.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
const type_entity_1 = require("../type/entities/type.entity");
const lib_1 = require("../common/lib");
let RecipeTypeService = class RecipeTypeService {
    constructor(recipeTypeRepository, recipeRepository, typeRepository, messageService) {
        this.recipeTypeRepository = recipeTypeRepository;
        this.recipeRepository = recipeRepository;
        this.typeRepository = typeRepository;
        this.messageService = messageService;
    }
    async create(item) {
        try {
            const check = await this.recipeTypeRepository.findOne({
                where: {
                    type: (0, typeorm_2.Like)(item.typeId),
                    recipe: (0, typeorm_2.Like)(item.recipeId),
                },
            });
            if (check) {
                throw new common_1.HttpException({
                    messageCode: 'IS_EXIST_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const recipe = await this.recipeRepository.findOne({
                where: {
                    id: item.recipeId,
                },
                relations: ['type'],
            });
            const type = await this.typeRepository.findOne({
                where: {
                    id: item.typeId,
                },
            });
            if (!recipe) {
                throw new common_1.HttpException({
                    messageCode: 'RECIPE_NOTFOUND',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!type) {
                throw new common_1.HttpException({
                    messageCode: 'TYPE_NOTFOUND',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (recipe.type.id != 5) {
                throw new common_1.HttpException({
                    messageCode: 'ADD_TOPPING_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            await this.recipeTypeRepository.save({
                type,
                recipe,
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
    async findAll(id) {
        try {
            const res = await this.recipeTypeRepository.find({
                where: {
                    type: (0, typeorm_2.Like)(id),
                },
                relations: ['recipe'],
            });
            if (res[0]) {
                const data = [];
                for (let i = 0; i < res.length; i++) {
                    data[i] = res[i].recipe;
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
    async remove(item) {
        try {
            const check = await this.recipeTypeRepository.findOne({
                where: {
                    type: (0, typeorm_2.Like)(item.typeId),
                    recipe: (0, typeorm_2.Like)(item.recipeId),
                },
            });
            console.log(check);
            if (!check) {
                throw new common_1.HttpException({
                    messageCode: 'IS_NOT_EXIST_ERROR',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            await this.recipeTypeRepository.delete(check.id);
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
    findOne(id) {
        return `This action returns a #${id} recipeType`;
    }
    update(id) {
        return `This action updates a #${id} recipeType`;
    }
};
exports.RecipeTypeService = RecipeTypeService;
exports.RecipeTypeService = RecipeTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_type_entity_1.RecipeType)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(2, (0, typeorm_1.InjectRepository)(type_entity_1.Type)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        lib_1.MessageService])
], RecipeTypeService);
//# sourceMappingURL=recipe_type.service.js.map