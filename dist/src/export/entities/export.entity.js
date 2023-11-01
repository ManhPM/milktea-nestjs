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
exports.Export = void 0;
const export_ingredient_entity_1 = require("../../export_ingredient/entities/export_ingredient.entity");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const typeorm_1 = require("typeorm");
let Export = class Export {
};
exports.Export = Export;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Export.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Export.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Export.prototype, "isCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Export.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Export.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff, (item) => item.imports),
    __metadata("design:type", staff_entity_1.Staff)
], Export.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => export_ingredient_entity_1.ExportIngredient, (item) => item.export),
    __metadata("design:type", Array)
], Export.prototype, "export_ingredients", void 0);
exports.Export = Export = __decorate([
    (0, typeorm_1.Entity)()
], Export);
//# sourceMappingURL=export.entity.js.map