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
exports.Invoice = void 0;
const invoice_product_entity_1 = require("../../invoice_product/entities/invoice_product.entity");
const shipping_company_entity_1 = require("../../shipping_company/entities/shipping_company.entity");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Invoice = class Invoice {
};
exports.Invoice = Invoice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Invoice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Invoice.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Invoice.prototype, "shippingFee", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Invoice.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Invoice.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Invoice.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Invoice.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (item) => item.invoices),
    __metadata("design:type", user_entity_1.User)
], Invoice.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff, (item) => item.invoices),
    __metadata("design:type", staff_entity_1.Staff)
], Invoice.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => shipping_company_entity_1.ShippingCompany, (item) => item.invoices),
    __metadata("design:type", shipping_company_entity_1.ShippingCompany)
], Invoice.prototype, "shippingCompany", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_product_entity_1.InvoiceProduct, (item) => item.invoice),
    __metadata("design:type", Array)
], Invoice.prototype, "invoice_products", void 0);
exports.Invoice = Invoice = __decorate([
    (0, typeorm_1.Entity)()
], Invoice);
//# sourceMappingURL=invoice.entity.js.map