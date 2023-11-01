"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingCompanyModule = void 0;
const common_1 = require("@nestjs/common");
const shipping_company_service_1 = require("./shipping_company.service");
const shipping_company_controller_1 = require("./shipping_company.controller");
const shipping_company_entity_1 = require("./entities/shipping_company.entity");
const typeorm_1 = require("@nestjs/typeorm");
const shop_entity_1 = require("../shop/entities/shop.entity");
const middlewares_1 = require("../common/middlewares/middlewares");
const validate_1 = require("../common/middlewares/validate");
const lib_1 = require("../common/lib");
let ShippingCompanyModule = class ShippingCompanyModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistShippingCompany)
            .forRoutes({ path: 'shipping-company/:id', method: common_1.RequestMethod.ALL });
        consumer
            .apply(validate_1.validateCreateShippingCompany, middlewares_1.CheckCreateShippingCompany)
            .forRoutes({ path: 'shipping-company', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateUpdateShippingCompany)
            .forRoutes({ path: 'shipping-company', method: common_1.RequestMethod.PATCH });
    }
};
exports.ShippingCompanyModule = ShippingCompanyModule;
exports.ShippingCompanyModule = ShippingCompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([shipping_company_entity_1.ShippingCompany, shop_entity_1.Shop])],
        controllers: [shipping_company_controller_1.ShippingCompanyController],
        providers: [shipping_company_service_1.ShippingCompanyService, lib_1.MessageService],
    })
], ShippingCompanyModule);
//# sourceMappingURL=shipping_company.module.js.map