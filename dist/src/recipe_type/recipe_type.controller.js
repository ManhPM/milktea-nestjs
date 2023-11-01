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
exports.RecipeTypeController = void 0;
const common_1 = require("@nestjs/common");
const recipe_type_service_1 = require("./recipe_type.service");
const create_recipe_type_dto_1 = require("./dto/create-recipe_type.dto");
const delete_recipe_type_dto_1 = require("./dto/delete-recipe_type.dto");
const auth_guard_1 = require("../auth/auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let RecipeTypeController = class RecipeTypeController {
    constructor(recipeTypeService) {
        this.recipeTypeService = recipeTypeService;
    }
    create(createRecipeTypeDto) {
        return this.recipeTypeService.create(createRecipeTypeDto);
    }
    findAll(id) {
        return this.recipeTypeService.findAll(id);
    }
    findOne(id) {
        return this.recipeTypeService.findOne(+id);
    }
    remove(item) {
        return this.recipeTypeService.remove(item);
    }
};
exports.RecipeTypeController = RecipeTypeController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_type_dto_1.CreateRecipeTypeDto]),
    __metadata("design:returntype", void 0)
], RecipeTypeController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecipeTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecipeTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2'),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_recipe_type_dto_1.DeleteRecipeTypeDto]),
    __metadata("design:returntype", void 0)
], RecipeTypeController.prototype, "remove", null);
exports.RecipeTypeController = RecipeTypeController = __decorate([
    (0, common_1.Controller)('recipe-type'),
    __metadata("design:paramtypes", [recipe_type_service_1.RecipeTypeService])
], RecipeTypeController);
//# sourceMappingURL=recipe_type.controller.js.map