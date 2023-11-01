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
exports.Staff = void 0;
const account_entity_1 = require("../../account/entities/account.entity");
const export_entity_1 = require("../../export/entities/export.entity");
const import_entity_1 = require("../../import/entities/import.entity");
const invoice_entity_1 = require("../../invoice/entities/invoice.entity");
const typeorm_1 = require("typeorm");
let Staff = class Staff {
};
exports.Staff = Staff;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Staff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Staff.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (item) => item.staff),
    __metadata("design:type", account_entity_1.Account)
], Staff.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => import_entity_1.Import, (item) => item.staff),
    __metadata("design:type", Array)
], Staff.prototype, "imports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => export_entity_1.Export, (item) => item.staff),
    __metadata("design:type", Array)
], Staff.prototype, "exports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_entity_1.Invoice, (item) => item.staff),
    __metadata("design:type", Array)
], Staff.prototype, "invoices", void 0);
exports.Staff = Staff = __decorate([
    (0, typeorm_1.Entity)()
], Staff);
//# sourceMappingURL=staff.entity.js.map