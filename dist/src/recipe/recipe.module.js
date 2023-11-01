"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModule = void 0;
const common_1 = require("@nestjs/common");
const recipe_service_1 = require("./recipe.service");
const recipe_controller_1 = require("./recipe.controller");
const recipe_entity_1 = require("./entities/recipe.entity");
const typeorm_1 = require("@nestjs/typeorm");
const product_recipe_entity_1 = require("../product_recipe/entities/product_recipe.entity");
const recipe_type_entity_1 = require("../recipe_type/entities/recipe_type.entity");
const type_entity_1 = require("../type/entities/type.entity");
const middlewares_1 = require("../common/middlewares/middlewares");
const type_service_1 = require("../type/type.service");
const validate_1 = require("../common/middlewares/validate");
const lib_1 = require("../common/lib");
const wishlist_entity_1 = require("../wishlist/entities/wishlist.entity");
let RecipeModule = class RecipeModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistRecipe)
            .forRoutes({ path: 'recipe/menu/:id', method: common_1.RequestMethod.ALL }, { path: 'recipe/ingredient/:id', method: common_1.RequestMethod.GET }, { path: 'recipe/recipe-topping/:id', method: common_1.RequestMethod.GET });
        consumer
            .apply(middlewares_1.CheckExistType)
            .forRoutes({ path: 'recipe/menu/:id', method: common_1.RequestMethod.GET }, { path: 'recipe/type-topping/:id', method: common_1.RequestMethod.GET });
        consumer
            .apply(validate_1.validateCreateRecipe)
            .forRoutes({ path: 'recipe', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateUpdateRecipe)
            .forRoutes({ path: 'recipe', method: common_1.RequestMethod.PATCH });
    }
};
exports.RecipeModule = RecipeModule;
exports.RecipeModule = RecipeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                recipe_entity_1.Recipe,
                product_recipe_entity_1.ProductRecipe,
                recipe_type_entity_1.RecipeType,
                type_entity_1.Type,
                wishlist_entity_1.Wishlist,
            ]),
        ],
        controllers: [recipe_controller_1.RecipeController],
        providers: [recipe_service_1.RecipeService, type_service_1.TypeService, lib_1.MessageService],
    })
], RecipeModule);
//# sourceMappingURL=recipe.module.js.map