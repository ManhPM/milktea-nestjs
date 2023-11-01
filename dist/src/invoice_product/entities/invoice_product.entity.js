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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceProduct = void 0;
const invoice_entity_1 = require("../../invoice/entities/invoice.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
let InvoiceProduct = class InvoiceProduct {
};
exports.InvoiceProduct = InvoiceProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InvoiceProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InvoiceProduct.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InvoiceProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InvoiceProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InvoiceProduct.prototype, "isReviewed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => invoice_entity_1.Invoice, (invoice) => invoice.invoice_products),
    __metadata("design:type", invoice_entity_1.Invoice)
], InvoiceProduct.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.invoice_products),
    __metadata("design:type", product_entity_1.Product)
], InvoiceProduct.prototype, "product", void 0);
exports.InvoiceProduct = InvoiceProduct = __decorate([
    (0, typeorm_1.Entity)()
], InvoiceProduct);
//# sourceMappingURL=invoice_product.entity.js.map