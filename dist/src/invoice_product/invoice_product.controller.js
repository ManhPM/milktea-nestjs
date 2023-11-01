"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceProductController = void 0;
const common_1 = require("@nestjs/common");
const invoice_product_service_1 = require("./invoice_product.service");
const create_invoice_product_dto_1 = require("./dto/create-invoice_product.dto");
const update_invoice_product_dto_1 = require("./dto/update-invoice_product.dto");
const auth_guard_1 = require("../auth/auth.guard");
let InvoiceProductController = class InvoiceProductController {
    constructor(invoiceProductService) {
        this.invoiceProductService = invoiceProductService;
    }
    create(createInvoiceProductDto) {
        return this.invoiceProductService.create(createInvoiceProductDto);
    }
    findAll(id) {
        return this.invoiceProductService.findAll(+id);
    }
    update(id, updateInvoiceProductDto) {
        return this.invoiceProductService.update(+id, updateInvoiceProductDto);
    }
    remove(id) {
        return this.invoiceProductService.remove(+id);
    }
};
exports.InvoiceProductController = InvoiceProductController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_product_dto_1.CreateInvoiceProductDto]),
    __metadata("design:returntype", void 0)
], InvoiceProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoiceProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_product_dto_1.UpdateInvoiceProductDto]),
    __metadata("design:returntype", void 0)
], InvoiceProductController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoiceProductController.prototype, "remove", null);
exports.InvoiceProductController = InvoiceProductController = __decorate([
    (0, common_1.Controller)('invoice-product'),
    __metadata("design:paramtypes", [invoice_product_service_1.InvoiceProductService])
], InvoiceProductController);
//# sourceMappingURL=invoice_product.controller.js.map