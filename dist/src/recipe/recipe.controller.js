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
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const recipe_service_1 = require("./recipe.service");
const create_recipe_dto_1 = require("./dto/create-recipe.dto");
const update_recipe_dto_1 = require("./dto/update-recipe.dto");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const filter_recipe_dto_1 = require("./dto/filter-recipe.dto");
let RecipeController = class RecipeController {
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    create(createRecipeDto) {
        return this.recipeService.create(createRecipeDto);
    }
    findAll(query) {
        return this.recipeService.getAllRecipe(query);
    }
    getRecipeByType(id, req) {
        return this.recipeService.getRecipeByType(+id, req);
    }
    getDetail(id) {
        return this.recipeService.getDetailRecipe(+id);
    }
    getAllIngredientOfRecipe(id) {
        return this.recipeService.getAllIngredientOfRecipe(+id);
    }
    getAllTopping() {
        return this.recipeService.getAllTopping();
    }
    getToppingByType(id) {
        return this.recipeService.getToppingByType(+id);
    }
    getToppingByRecipe(id) {
        return this.recipeService.getToppingByRecipe(+id);
    }
    update(id, updateRecipeDto) {
        return this.recipeService.update(+id, updateRecipeDto);
    }
    remove(id) {
        return this.recipeService.remove(+id);
    }
};
exports.RecipeController = RecipeController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_dto_1.CreateRecipeDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/menu'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_recipe_dto_1.FilterRecipeDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/menu/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getRecipeByType", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getDetail", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)('/ingredient/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getAllIngredientOfRecipe", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Get)('/topping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getAllTopping", null);
__decorate([
    (0, common_1.Get)('/type-topping/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getToppingByType", null);
__decorate([
    (0, common_1.Get)('/recipe-topping/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getToppingByRecipe", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_recipe_dto_1.UpdateRecipeDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "remove", null);
exports.RecipeController = RecipeController = __decorate([
    (0, common_1.Controller)('recipe'),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService])
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map