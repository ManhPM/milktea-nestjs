"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const review_controller_1 = require("./review.controller");
const review_entity_1 = require("./entities/review.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
const invoice_entity_1 = require("../invoice/entities/invoice.entity");
const invoice_product_entity_1 = require("../invoice_product/entities/invoice_product.entity");
const middlewares_1 = require("../common/middlewares/middlewares");
const recipe_service_1 = require("../recipe/recipe.service");
const product_recipe_entity_1 = require("../product_recipe/entities/product_recipe.entity");
const recipe_type_entity_1 = require("../recipe_type/entities/recipe_type.entity");
const type_entity_1 = require("../type/entities/type.entity");
const validate_1 = require("../common/middlewares/validate");
const invoice_service_1 = require("../invoice/invoice.service");
const ingredient_entity_1 = require("../ingredient/entities/ingredient.entity");
const cart_product_entity_1 = require("../cart_product/entities/cart_product.entity");
const shop_entity_1 = require("../shop/entities/shop.entity");
const product_entity_1 = require("../product/entities/product.entity");
const shipping_company_entity_1 = require("../shipping_company/entities/shipping_company.entity");
const product_service_1 = require("../product/product.service");
const lib_1 = require("../common/lib");
const wishlist_entity_1 = require("../wishlist/entities/wishlist.entity");
let ReviewModule = class ReviewModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistRecipe)
            .forRoutes({ path: 'review/:id', method: common_1.RequestMethod.ALL });
        consumer
            .apply(validate_1.validateCreateReview, middlewares_1.CheckCreateReview)
            .forRoutes({ path: 'review', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateCreateReview)
            .forRoutes({ path: 'review', method: common_1.RequestMethod.POST });
    }
};
exports.ReviewModule = ReviewModule;
exports.ReviewModule = ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                review_entity_1.Review,
                user_entity_1.User,
                recipe_entity_1.Recipe,
                invoice_entity_1.Invoice,
                invoice_product_entity_1.InvoiceProduct,
                product_recipe_entity_1.ProductRecipe,
                recipe_type_entity_1.RecipeType,
                type_entity_1.Type,
                ingredient_entity_1.Ingredient,
                cart_product_entity_1.CartProduct,
                shop_entity_1.Shop,
                product_entity_1.Product,
                shipping_company_entity_1.ShippingCompany,
                wishlist_entity_1.Wishlist,
            ]),
        ],
        controllers: [review_controller_1.ReviewController],
        providers: [
            review_service_1.ReviewService,
            recipe_service_1.RecipeService,
            invoice_service_1.InvoiceService,
            product_service_1.ProductService,
            lib_1.MessageService,
        ],
    })
], ReviewModule);
//# sourceMappingURL=review.module.js.map