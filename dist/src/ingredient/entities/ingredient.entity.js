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
exports.Ingredient = void 0;
const export_ingredient_entity_1 = require("../../export_ingredient/entities/export_ingredient.entity");
const import_ingredient_entity_1 = require("../../import_ingredient/entities/import_ingredient.entity");
const recipe_ingredient_entity_1 = require("../../recipe_ingredient/entities/recipe_ingredient.entity");
const typeorm_1 = require("typeorm");
let Ingredient = class Ingredient {
};
exports.Ingredient = Ingredient;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ingredient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ingredient.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ingredient.prototype, "unitName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ingredient.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Ingredient.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Ingredient.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_ingredient_entity_1.RecipeIngredient, (item) => item.ingredient),
    __metadata("design:type", Array)
], Ingredient.prototype, "recipe_ingredients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => import_ingredient_entity_1.ImportIngredient, (item) => item.ingredient),
    __metadata("design:type", Array)
], Ingredient.prototype, "import_ingredients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => export_ingredient_entity_1.ExportIngredient, (item) => item.ingredient),
    __metadata("design:type", Array)
], Ingredient.prototype, "export_ingredients", void 0);
exports.Ingredient = Ingredient = __decorate([
    (0, typeorm_1.Entity)()
], Ingredient);
//# sourceMappingURL=ingredient.entity.js.map