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
exports.RecipeIngredientController = void 0;
const common_1 = require("@nestjs/common");
const recipe_ingredient_service_1 = require("./recipe_ingredient.service");
const create_recipe_ingredient_dto_1 = require("./dto/create-recipe_ingredient.dto");
const update_recipe_ingredient_dto_1 = require("./dto/update-recipe_ingredient.dto");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const delete_recipe_ingredient_dto_1 = require("./dto/delete-recipe_ingredient.dto");
let RecipeIngredientController = class RecipeIngredientController {
    constructor(recipeIngredientService) {
        this.recipeIngredientService = recipeIngredientService;
    }
    create(createRecipeIngredientDto) {
        return this.recipeIngredientService.create(createRecipeIngredientDto);
    }
    findOne(id) {
        return this.recipeIngredientService.findOne(+id);
    }
    update(updateRecipeIngredientDto) {
        return this.recipeIngredientService.update(updateRecipeIngredientDto);
    }
    remove(item) {
        return this.recipeIngredientService.remove(item);
    }
};
exports.RecipeIngredientController = RecipeIngredientController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_ingredient_dto_1.CreateRecipeIngredientDto]),
    __metadata("design:returntype", void 0)
], RecipeIngredientController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecipeIngredientController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_recipe_ingredient_dto_1.UpdateRecipeIngredientDto]),
    __metadata("design:returntype", void 0)
], RecipeIngredientController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_recipe_ingredient_dto_1.DeleteRecipeIngredientDto]),
    __metadata("design:returntype", void 0)
], RecipeIngredientController.prototype, "remove", null);
exports.RecipeIngredientController = RecipeIngredientController = __decorate([
    (0, common_1.Controller)('recipe-ingredient'),
    __metadata("design:paramtypes", [recipe_ingredient_service_1.RecipeIngredientService])
], RecipeIngredientController);
//# sourceMappingURL=recipe_ingredient.controller.js.map