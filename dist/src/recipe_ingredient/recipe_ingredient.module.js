"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeIngredientModule = void 0;
const common_1 = require("@nestjs/common");
const recipe_ingredient_service_1 = require("./recipe_ingredient.service");
const recipe_ingredient_controller_1 = require("./recipe_ingredient.controller");
const recipe_ingredient_entity_1 = require("./entities/recipe_ingredient.entity");
const typeorm_1 = require("@nestjs/typeorm");
const lib_1 = require("../common/lib");
const ingredient_entity_1 = require("../ingredient/entities/ingredient.entity");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
let RecipeIngredientModule = class RecipeIngredientModule {
};
exports.RecipeIngredientModule = RecipeIngredientModule;
exports.RecipeIngredientModule = RecipeIngredientModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([recipe_ingredient_entity_1.RecipeIngredient, recipe_entity_1.Recipe, ingredient_entity_1.Ingredient])],
        controllers: [recipe_ingredient_controller_1.RecipeIngredientController],
        providers: [recipe_ingredient_service_1.RecipeIngredientService, lib_1.MessageService],
    })
], RecipeIngredientModule);
//# sourceMappingURL=recipe_ingredient.module.js.map