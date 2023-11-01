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
exports.ProductRecipe = void 0;
const product_entity_1 = require("../../product/entities/product.entity");
const recipe_entity_1 = require("../../recipe/entities/recipe.entity");
const typeorm_1 = require("typeorm");
let ProductRecipe = class ProductRecipe {
};
exports.ProductRecipe = ProductRecipe;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductRecipe.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductRecipe.prototype, "isMain", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => recipe_entity_1.Recipe, (invoice) => invoice.product_recipes),
    __metadata("design:type", recipe_entity_1.Recipe)
], ProductRecipe.prototype, "recipe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.product_recipes),
    __metadata("design:type", product_entity_1.Product)
], ProductRecipe.prototype, "product", void 0);
exports.ProductRecipe = ProductRecipe = __decorate([
    (0, typeorm_1.Entity)()
], ProductRecipe);
//# sourceMappingURL=product_recipe.entity.js.map