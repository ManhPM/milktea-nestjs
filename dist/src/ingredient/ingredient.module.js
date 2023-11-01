"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientModule = void 0;
const common_1 = require("@nestjs/common");
const ingredient_service_1 = require("./ingredient.service");
const ingredient_controller_1 = require("./ingredient.controller");
const ingredient_entity_1 = require("./entities/ingredient.entity");
const typeorm_1 = require("@nestjs/typeorm");
const middlewares_1 = require("../common/middlewares/middlewares");
const validate_1 = require("../common/middlewares/validate");
const lib_1 = require("../common/lib");
const recipe_ingredient_entity_1 = require("../recipe_ingredient/entities/recipe_ingredient.entity");
let IngredientModule = class IngredientModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistIngredient)
            .forRoutes({ path: 'ingredient/:id', method: common_1.RequestMethod.ALL });
        consumer
            .apply(validate_1.validateCreateIngredient, middlewares_1.CheckCreateIngredient)
            .forRoutes({ path: 'ingredient', method: common_1.RequestMethod.POST });
    }
};
exports.IngredientModule = IngredientModule;
exports.IngredientModule = IngredientModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ingredient_entity_1.Ingredient, recipe_ingredient_entity_1.RecipeIngredient])],
        controllers: [ingredient_controller_1.IngredientController],
        providers: [ingredient_service_1.IngredientService, lib_1.MessageService],
    })
], IngredientModule);
//# sourceMappingURL=ingredient.module.js.map