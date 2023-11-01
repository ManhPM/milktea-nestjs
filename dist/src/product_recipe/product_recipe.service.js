"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRecipeService = void 0;
const common_1 = require("@nestjs/common");
let ProductRecipeService = class ProductRecipeService {
    create(createProductRecipeDto) {
        return 'This action adds a new productRecipe';
    }
    findAll() {
        return `This action returns all productRecipe`;
    }
    findOne(id) {
        return `This action returns a #${id} productRecipe`;
    }
    update(id, updateProductRecipeDto) {
        return `This action updates a #${id} productRecipe`;
    }
    remove(id) {
        return `This action removes a #${id} productRecipe`;
    }
};
exports.ProductRecipeService = ProductRecipeService;
exports.ProductRecipeService = ProductRecipeService = __decorate([
    (0, common_1.Injectable)()
], ProductRecipeService);
//# sourceMappingURL=product_recipe.service.js.map