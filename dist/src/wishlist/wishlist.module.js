"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistModule = void 0;
const common_1 = require("@nestjs/common");
const wishlist_service_1 = require("./wishlist.service");
const wishlist_controller_1 = require("./wishlist.controller");
const typeorm_1 = require("@nestjs/typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const user_entity_1 = require("../user/entities/user.entity");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
const middlewares_1 = require("../common/middlewares/middlewares");
const recipe_service_1 = require("../recipe/recipe.service");
const product_recipe_entity_1 = require("../product_recipe/entities/product_recipe.entity");
const recipe_type_entity_1 = require("../recipe_type/entities/recipe_type.entity");
const type_entity_1 = require("../type/entities/type.entity");
const lib_1 = require("../common/lib");
let WishlistModule = class WishlistModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistRecipe)
            .forRoutes({ path: 'wishlist/:id', method: common_1.RequestMethod.POST });
    }
};
exports.WishlistModule = WishlistModule;
exports.WishlistModule = WishlistModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                wishlist_entity_1.Wishlist,
                user_entity_1.User,
                recipe_entity_1.Recipe,
                product_recipe_entity_1.ProductRecipe,
                recipe_type_entity_1.RecipeType,
                type_entity_1.Type,
            ]),
        ],
        controllers: [wishlist_controller_1.WishlistController],
        providers: [wishlist_service_1.WishlistService, recipe_service_1.RecipeService, lib_1.MessageService],
    })
], WishlistModule);
//# sourceMappingURL=wishlist.module.js.map