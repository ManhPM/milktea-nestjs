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
exports.ExportIngredient = void 0;
const export_entity_1 = require("../../export/entities/export.entity");
const ingredient_entity_1 = require("../../ingredient/entities/ingredient.entity");
const typeorm_1 = require("typeorm");
let ExportIngredient = class ExportIngredient {
};
exports.ExportIngredient = ExportIngredient;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExportIngredient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExportIngredient.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExportIngredient.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => export_entity_1.Export, (item) => item.export_ingredients),
    __metadata("design:type", export_entity_1.Export)
], ExportIngredient.prototype, "export", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ingredient_entity_1.Ingredient, (item) => item.export_ingredients),
    __metadata("design:type", ingredient_entity_1.Ingredient)
], ExportIngredient.prototype, "ingredient", void 0);
exports.ExportIngredient = ExportIngredient = __decorate([
    (0, typeorm_1.Entity)()
], ExportIngredient);
//# sourceMappingURL=export_ingredient.entity.js.map