"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceModule = void 0;
const common_1 = require("@nestjs/common");
const invoice_service_1 = require("./invoice.service");
const invoice_controller_1 = require("./invoice.controller");
const invoice_entity_1 = require("./entities/invoice.entity");
const typeorm_1 = require("@nestjs/typeorm");
const invoice_product_entity_1 = require("../invoice_product/entities/invoice_product.entity");
const ingredient_entity_1 = require("../ingredient/entities/ingredient.entity");
const cart_product_entity_1 = require("../cart_product/entities/cart_product.entity");
const user_entity_1 = require("../user/entities/user.entity");
const shop_entity_1 = require("../shop/entities/shop.entity");
const product_entity_1 = require("../product/entities/product.entity");
const shipping_company_entity_1 = require("../shipping_company/entities/shipping_company.entity");
const middlewares_1 = require("../common/middlewares/middlewares");
const validate_1 = require("../common/middlewares/validate");
const shipping_company_service_1 = require("../shipping_company/shipping_company.service");
const export_service_1 = require("../export/export.service");
const export_entity_1 = require("../export/entities/export.entity");
const export_ingredient_entity_1 = require("../export_ingredient/entities/export_ingredient.entity");
const lib_1 = require("../common/lib");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
let InvoiceModule = class InvoiceModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistInvoice)
            .exclude({ path: 'invoice/statistical', method: common_1.RequestMethod.GET }, 'invoice/checkout')
            .forRoutes({ path: 'invoice/:id', method: common_1.RequestMethod.ALL }, { path: 'invoice/.*/:id', method: common_1.RequestMethod.ALL });
        consumer
            .apply(validate_1.validateCheckOut)
            .forRoutes({ path: 'invoice/checkout', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateFromDateToDate)
            .forRoutes({ path: 'invoice/statistical', method: common_1.RequestMethod.GET }, { path: 'invoice', method: common_1.RequestMethod.GET });
    }
};
exports.InvoiceModule = InvoiceModule;
exports.InvoiceModule = InvoiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                invoice_entity_1.Invoice,
                invoice_product_entity_1.InvoiceProduct,
                ingredient_entity_1.Ingredient,
                cart_product_entity_1.CartProduct,
                user_entity_1.User,
                shop_entity_1.Shop,
                product_entity_1.Product,
                shipping_company_entity_1.ShippingCompany,
                export_entity_1.Export,
                export_ingredient_entity_1.ExportIngredient,
                recipe_entity_1.Recipe,
            ]),
        ],
        controllers: [invoice_controller_1.InvoiceController],
        providers: [
            invoice_service_1.InvoiceService,
            shipping_company_service_1.ShippingCompanyService,
            export_service_1.ExportService,
            lib_1.MessageService,
        ],
    })
], InvoiceModule);
//# sourceMappingURL=invoice.module.js.map