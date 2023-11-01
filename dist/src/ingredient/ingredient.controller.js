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
exports.IngredientController = void 0;
const common_1 = require("@nestjs/common");
const ingredient_service_1 = require("./ingredient.service");
const create_ingredient_dto_1 = require("./dto/create-ingredient.dto");
const update_ingredient_dto_1 = require("./dto/update-ingredient.dto");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const filter_ingredient_dto_1 = require("./dto/filter-ingredient.dto");
let IngredientController = class IngredientController {
    constructor(ingredientService) {
        this.ingredientService = ingredientService;
    }
    create(createIngredientDto) {
        return this.ingredientService.create(createIngredientDto);
    }
    findAll(query) {
        return this.ingredientService.findAll(query);
    }
    findOne(id) {
        return this.ingredientService.findOne(+id);
    }
    update(id, updateIngredientDto) {
        return this.ingredientService.update(+id, updateIngredientDto);
    }
    remove(id) {
        return this.ingredientService.remove(+id);
    }
};
exports.IngredientController = IngredientController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ingredient_dto_1.CreateIngredientDto]),
    __metadata("design:returntype", void 0)
], IngredientController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_ingredient_dto_1.FilterIngredientDto]),
    __metadata("design:returntype", void 0)
], IngredientController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngredientController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ingredient_dto_1.UpdateIngredientDto]),
    __metadata("design:returntype", void 0)
], IngredientController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngredientController.prototype, "remove", null);
exports.IngredientController = IngredientController = __decorate([
    (0, common_1.Controller)('ingredient'),
    __metadata("design:paramtypes", [ingredient_service_1.IngredientService])
], IngredientController);
//# sourceMappingURL=ingredient.controller.js.map