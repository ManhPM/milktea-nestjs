"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceProductModule = void 0;
const common_1 = require("@nestjs/common");
const invoice_product_service_1 = require("./invoice_product.service");
const invoice_product_controller_1 = require("./invoice_product.controller");
const invoice_product_entity_1 = require("./entities/invoice_product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const lib_1 = require("../common/lib");
let InvoiceProductModule = class InvoiceProductModule {
};
exports.InvoiceProductModule = InvoiceProductModule;
exports.InvoiceProductModule = InvoiceProductModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([invoice_product_entity_1.InvoiceProduct])],
        controllers: [invoice_product_controller_1.InvoiceProductController],
        providers: [invoice_product_service_1.InvoiceProductService, lib_1.MessageService],
    })
], InvoiceProductModule);
//# sourceMappingURL=invoice_product.module.js.map