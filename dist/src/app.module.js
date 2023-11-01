"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./auth/auth.module");
const account_module_1 = require("./account/account.module");
const staff_module_1 = require("./staff/staff.module");
const user_module_1 = require("./user/user.module");
const product_module_1 = require("./product/product.module");
const cart_product_module_1 = require("./cart_product/cart_product.module");
const shipping_company_module_1 = require("./shipping_company/shipping_company.module");
const recipe_module_1 = require("./recipe/recipe.module");
const recipe_ingredient_module_1 = require("./recipe_ingredient/recipe_ingredient.module");
const shop_module_1 = require("./shop/shop.module");
const recipe_type_module_1 = require("./recipe_type/recipe_type.module");
const type_module_1 = require("./type/type.module");
const invoice_module_1 = require("./invoice/invoice.module");
const invoice_product_module_1 = require("./invoice_product/invoice_product.module");
const import_module_1 = require("./import/import.module");
const export_module_1 = require("./export/export.module");
const import_ingredient_module_1 = require("./import_ingredient/import_ingredient.module");
const export_ingredient_module_1 = require("./export_ingredient/export_ingredient.module");
const ingredient_module_1 = require("./ingredient/ingredient.module");
const review_module_1 = require("./review/review.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const product_recipe_module_1 = require("./product_recipe/product_recipe.module");
const mailer_1 = require("@nestjs-modules/mailer");
const schedule_1 = require("@nestjs/schedule");
const verify_module_1 = require("./verify/verify.module");
const data_source_1 = require("../db/data-source");
const SECRET = 'SECRETMILKTEANESTJS';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions),
            config_1.ConfigModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            account_module_1.AccountModule,
            staff_module_1.StaffModule,
            user_module_1.UserModule,
            product_module_1.ProductModule,
            cart_product_module_1.CartProductModule,
            shipping_company_module_1.ShippingCompanyModule,
            recipe_module_1.RecipeModule,
            recipe_ingredient_module_1.RecipeIngredientModule,
            shop_module_1.ShopModule,
            recipe_type_module_1.RecipeTypeModule,
            type_module_1.TypeModule,
            invoice_module_1.InvoiceModule,
            invoice_product_module_1.InvoiceProductModule,
            import_module_1.ImportModule,
            export_module_1.ExportModule,
            import_ingredient_module_1.ImportIngredientModule,
            export_ingredient_module_1.ExportIngredientModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: SECRET,
            }),
            ingredient_module_1.IngredientModule,
            review_module_1.ReviewModule,
            wishlist_module_1.WishlistModule,
            product_recipe_module_1.ProductRecipeModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    auth: {
                        user: 'n19dccn107@student.ptithcm.edu.vn',
                        pass: 'dzwedtbaoqsmrkob',
                    },
                },
            }),
            verify_module_1.VerifyModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map