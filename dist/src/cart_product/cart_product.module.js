"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartProductModule = void 0;
const common_1 = require("@nestjs/common");
const cart_product_service_1 = require("./cart_product.service");
const cart_product_controller_1 = require("./cart_product.controller");
const cart_product_entity_1 = require("./entities/cart_product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../product/entities/product.entity");
const product_recipe_entity_1 = require("../product_recipe/entities/product_recipe.entity");
const user_entity_1 = require("../user/entities/user.entity");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
const middlewares_1 = require("../common/middlewares/middlewares");
const product_service_1 = require("../product/product.service");
const validate_1 = require("../common/middlewares/validate");
const lib_1 = require("../common/lib");
let CartProductModule = class CartProductModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistProduct)
            .forRoutes({ path: 'cart-product/:id', method: common_1.RequestMethod.ALL });
        consumer
            .apply(validate_1.validateCreateCartProduct)
            .forRoutes({ path: 'cart-product', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateUpdateCartProduct)
            .forRoutes({ path: 'cart-product', method: common_1.RequestMethod.PATCH });
    }
};
exports.CartProductModule = CartProductModule;
exports.CartProductModule = CartProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                cart_product_entity_1.CartProduct,
                product_entity_1.Product,
                product_recipe_entity_1.ProductRecipe,
                user_entity_1.User,
                recipe_entity_1.Recipe,
            ]),
        ],
        controllers: [cart_product_controller_1.CartProductController],
        providers: [cart_product_service_1.CartProductService, product_service_1.ProductService, lib_1.MessageService],
    })
], CartProductModule);
//# sourceMappingURL=cart_product.module.js.map