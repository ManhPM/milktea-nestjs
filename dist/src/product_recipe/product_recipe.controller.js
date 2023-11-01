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
exports.ProductRecipeController = void 0;
const common_1 = require("@nestjs/common");
const product_recipe_service_1 = require("./product_recipe.service");
const create_product_recipe_dto_1 = require("./dto/create-product_recipe.dto");
const update_product_recipe_dto_1 = require("./dto/update-product_recipe.dto");
let ProductRecipeController = class ProductRecipeController {
    constructor(productRecipeService) {
        this.productRecipeService = productRecipeService;
    }
    create(createProductRecipeDto) {
        return this.productRecipeService.create(createProductRecipeDto);
    }
    findAll() {
        return this.productRecipeService.findAll();
    }
    findOne(id) {
        return this.productRecipeService.findOne(+id);
    }
    update(id, updateProductRecipeDto) {
        return this.productRecipeService.update(+id, updateProductRecipeDto);
    }
    remove(id) {
        return this.productRecipeService.remove(+id);
    }
};
exports.ProductRecipeController = ProductRecipeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_recipe_dto_1.CreateProductRecipeDto]),
    __metadata("design:returntype", void 0)
], ProductRecipeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductRecipeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductRecipeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_recipe_dto_1.UpdateProductRecipeDto]),
    __metadata("design:returntype", void 0)
], ProductRecipeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductRecipeController.prototype, "remove", null);
exports.ProductRecipeController = ProductRecipeController = __decorate([
    (0, common_1.Controller)('product-recipe'),
    __metadata("design:paramtypes", [product_recipe_service_1.ProductRecipeService])
], ProductRecipeController);
//# sourceMappingURL=product_recipe.controller.js.map