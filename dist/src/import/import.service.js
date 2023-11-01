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
exports.ImportService = void 0;
const common_1 = require("@nestjs/common");
const create_import_dto_1 = require("./dto/create-import.dto");
const import_entity_1 = require("./entities/import.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ingredient_entity_1 = require("../ingredient/entities/ingredient.entity");
const import_ingredient_entity_1 = require("../import_ingredient/entities/import_ingredient.entity");
const lib_1 = require("../common/lib");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
let ImportService = class ImportService {
    constructor(importRepository, recipeRepository, ingredientRepository, importIngredientRepository, dataSource, messageService) {
        this.importRepository = importRepository;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.importIngredientRepository = importIngredientRepository;
        this.dataSource = dataSource;
        this.messageService = messageService;
    }
    async findAll(query) {
        try {
            const fromDate = query.fromdate;
            const toDate = new Date(query.todate);
            toDate.setDate(toDate.getDate() + 1);
            toDate.setMinutes(toDate.getMinutes() - 1);
            const status = query.status;
            let res = [];
            if (fromDate && toDate) {
                if (status) {
                    res = await this.importRepository.find({
                        relations: ['staff'],
                        where: {
                            isCompleted: status,
                            date: (0, typeorm_2.Between)(fromDate, toDate),
                        },
                        order: {
                            date: 'DESC',
                        },
                    });
                }
                else {
                    res = await this.importRepository.find({
                        relations: ['staff'],
                        where: {
                            date: (0, typeorm_2.Between)(fromDate, toDate),
                        },
                        order: {
                            date: 'DESC',
                        },
                    });
                }
            }
            else {
                if (status) {
                    res = await this.importRepository.find({
                        relations: ['staff'],
                        where: {
                            isCompleted: status,
                        },
                        order: {
                            date: 'DESC',
                        },
                    });
                }
                else {
                    res = await this.importRepository.find({
                        relations: ['staff'],
                        order: {
                            date: 'DESC',
                        },
                    });
                }
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
    async findIngredientImport(id) {
        try {
            const ingredients = await this.ingredientRepository.find({});
            const importedIngredients = await this.importIngredientRepository.find({
                where: {
                    import: (0, typeorm_2.Like)(id),
                },
                relations: ['ingredient'],
            });
            const nonImportedIngredients = ingredients.filter((ingredient) => !importedIngredients.some((importedIngredient) => importedIngredient.ingredient.id == ingredient.id));
            return {
                data: nonImportedIngredients,
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
            const res = await this.importRepository.findOne({
                where: {
                    id: id,
                },
                relations: ['staff', 'import_ingredients.ingredient'],
            });
            return res;
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
    async completeImport(id) {
        return await this.dataSource.transaction(async (transactionalEntityManager) => {
            try {
                const importIngredients = await transactionalEntityManager
                    .getRepository(import_ingredient_entity_1.ImportIngredient)
                    .find({
                    where: {
                        import: (0, typeorm_2.Like)(id),
                    },
                    relations: ['ingredient'],
                });
                let totalAmount = 0;
                for (const importIngredient of importIngredients) {
                    totalAmount += importIngredient.price;
                    await transactionalEntityManager
                        .createQueryBuilder()
                        .update(ingredient_entity_1.Ingredient)
                        .set({ quantity: () => '`quantity` + :newQuantity' })
                        .where('id = :id', { id: importIngredient.ingredient.id })
                        .setParameter('newQuantity', importIngredient.quantity)
                        .execute();
                }
                const recipes = await transactionalEntityManager
                    .getRepository(recipe_entity_1.Recipe)
                    .find({
                    where: {
                        isActive: 2,
                    },
                    relations: ['recipe_ingredients.ingredient'],
                });
                if (recipes[0]) {
                    for (const recipe of recipes) {
                        let canActive = 1;
                        for (let i = 0; i < recipe.recipe_ingredients.length; i++) {
                            if (recipe.recipe_ingredients[i].quantity >
                                recipe.recipe_ingredients[i].ingredient.quantity) {
                                canActive = 0;
                            }
                            if (canActive) {
                                await transactionalEntityManager
                                    .getRepository(recipe_entity_1.Recipe)
                                    .update(recipe.id, {
                                    isActive: 1,
                                });
                            }
                        }
                    }
                }
                console.log(totalAmount);
                await transactionalEntityManager.update(import_entity_1.Import, id, {
                    total: totalAmount,
                    isCompleted: 1,
                });
                const message = await this.messageService.getMessage('COMPLETE_IMPORT_SUCCESS');
                return {
                    message: message,
                };
            }
            catch (error) {
                const message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    async create(createImportDto, req) {
        try {
            const date = new Date();
            date.setHours(date.getHours() + 7);
            createImportDto.date = date;
            const check = await this.importRepository.findOne({
                where: {
                    staff: req.user.id,
                    isCompleted: 0,
                },
            });
            if (!createImportDto.description) {
                createImportDto.description = 'Mô tả';
            }
            if (check) {
                throw new common_1.HttpException({
                    messageCode: 'IMPORT_ISEXIST_ERROR',
                    data: check,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const invoice = await this.importRepository.save({
                ...createImportDto,
                staff: req.user.id,
            });
            const message = await this.messageService.getMessage('CREATE_SUCCESS');
            return {
                data: invoice,
                message: message,
            };
        }
        catch (error) {
            let message;
            if (error.response) {
                if ((error.response.messageCode = 'IMPORT_ISEXIST_ERROR')) {
                    throw new common_1.HttpException({
                        data: error.response.data,
                    }, common_1.HttpStatus.OK);
                }
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
    async update(id, updateImportDto) {
        try {
            await this.importRepository.update(id, {
                ...updateImportDto,
            });
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
    async createIngredientImport(item) {
        return await this.dataSource.transaction(async (manager) => {
            try {
                const ingredientArray = item.ingredientId.split(',');
                const priceArray = item.price.split(',');
                const quantityArray = item.quantity.split(',');
                for (let i = 0; i < ingredientArray.length; i++) {
                    const importInvoice = await manager.getRepository(import_entity_1.Import).findOne({
                        where: {
                            id: Number(item.importId),
                        },
                    });
                    const ingredient = await manager.getRepository(ingredient_entity_1.Ingredient).findOne({
                        where: {
                            id: Number(ingredientArray[i]),
                        },
                    });
                    const importIngredient = await manager
                        .getRepository(import_ingredient_entity_1.ImportIngredient)
                        .findOne({
                        where: {
                            import: (0, typeorm_2.Like)(importInvoice.id),
                            ingredient: (0, typeorm_2.Like)(ingredient.id),
                        },
                    });
                    if (importIngredient) {
                        throw new common_1.HttpException({
                            messageCode: 'IMPORT_EXPORT_INGREDIENT_ERROR',
                        }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    await manager.getRepository(import_ingredient_entity_1.ImportIngredient).save({
                        price: Number(priceArray[i]),
                        quantity: Number(quantityArray[i]),
                        import: importInvoice,
                        ingredient: ingredient,
                    });
                }
                const message = await this.messageService.getMessage('CREATE_SUCCESS');
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
                    message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                    throw new common_1.HttpException({
                        message: message,
                    }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }
    async deleteIngredientImport(item) {
        try {
            const importInvoice = await this.importRepository.findOne({
                where: {
                    id: item.importId,
                },
            });
            const ingredient = await this.ingredientRepository.findOne({
                where: {
                    id: item.ingredientId,
                },
            });
            await this.importIngredientRepository.delete({
                ingredient: ingredient,
                import: importInvoice,
            });
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
    async remove(id) {
        try {
            const check = await this.importRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (check.isCompleted != 0) {
                throw new common_1.HttpException({
                    messageCode: 'CANCEL_INVOICE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            await this.importRepository.update(id, {
                isCompleted: -1,
            });
            const message = await this.messageService.getMessage('CANCEL_SUCCESS');
            return {
                message: message,
            };
        }
        catch (error) {
            if (error.response) {
                const message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                const message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async checkExist(id) {
        try {
            return await this.importRepository.findOne({
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
exports.ImportService = ImportService;
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportService.prototype, "findAll", null);
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_import_dto_1.CreateImportDto, Object]),
    __metadata("design:returntype", Promise)
], ImportService.prototype, "create", null);
exports.ImportService = ImportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(import_entity_1.Import)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(2, (0, typeorm_1.InjectRepository)(ingredient_entity_1.Ingredient)),
    __param(3, (0, typeorm_1.InjectRepository)(import_ingredient_entity_1.ImportIngredient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        lib_1.MessageService])
], ImportService);
//# sourceMappingURL=import.service.js.map