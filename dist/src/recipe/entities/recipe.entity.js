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
exports.Recipe = void 0;
const product_recipe_entity_1 = require("../../product_recipe/entities/product_recipe.entity");
const recipe_ingredient_entity_1 = require("../../recipe_ingredient/entities/recipe_ingredient.entity");
const recipe_type_entity_1 = require("../../recipe_type/entities/recipe_type.entity");
const review_entity_1 = require("../../review/entities/review.entity");
const type_entity_1 = require("../../type/entities/type.entity");
const wishlist_entity_1 = require("../../wishlist/entities/wishlist.entity");
const typeorm_1 = require("typeorm");
let Recipe = class Recipe {
};
exports.Recipe = Recipe;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Recipe.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Recipe.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Recipe.prototype, "info", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Recipe.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recipe.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recipe.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recipe.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => type_entity_1.Type, (item) => item.recipes),
    __metadata("design:type", type_entity_1.Type)
], Recipe.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_recipe_entity_1.ProductRecipe, (item) => item.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "product_recipes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_ingredient_entity_1.RecipeIngredient, (item) => item.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "recipe_ingredients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_type_entity_1.RecipeType, (item) => item.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "recipe_types", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => wishlist_entity_1.Wishlist, (item) => item.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "wishlists", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (item) => item.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "reviews", void 0);
exports.Recipe = Recipe = __decorate([
    (0, typeorm_1.Entity)()
], Recipe);
//# sourceMappingURL=recipe.entity.js.map