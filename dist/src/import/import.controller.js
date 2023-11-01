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
exports.ImportController = void 0;
const common_1 = require("@nestjs/common");
const import_service_1 = require("./import.service");
const create_import_dto_1 = require("./dto/create-import.dto");
const update_import_dto_1 = require("./dto/update-import.dto");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_import_ingredient_dto_1 = require("../import_ingredient/dto/create-import_ingredient.dto");
const update_import_ingredient_dto_1 = require("../import_ingredient/dto/update-import_ingredient.dto");
let ImportController = class ImportController {
    constructor(importService) {
        this.importService = importService;
    }
    create(createImportDto, req) {
        return this.importService.create(createImportDto, req);
    }
    createIngredientImport(createImportDto) {
        return this.importService.createIngredientImport(createImportDto);
    }
    deleteIngredientImport(item) {
        return this.importService.deleteIngredientImport(item);
    }
    findAll(query) {
        return this.importService.findAll(query);
    }
    findIngredientImport(id) {
        return this.importService.findIngredientImport(id);
    }
    completeImport(id) {
        return this.importService.completeImport(id);
    }
    findOne(id) {
        return this.importService.findOne(+id);
    }
    update(id, updateImportDto) {
        return this.importService.update(+id, updateImportDto);
    }
    remove(id) {
        return this.importService.remove(+id);
    }
};
exports.ImportController = ImportController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_import_dto_1.CreateImportDto, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Post)('ingredient'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_import_ingredient_dto_1.CreateImportIngredientDto]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "createIngredientImport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Delete)('ingredient'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_import_ingredient_dto_1.UpdateImportIngredientDto]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "deleteIngredientImport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)('/ingredient/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "findIngredientImport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)('/complete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "completeImport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_import_dto_1.UpdateImportDto]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "remove", null);
exports.ImportController = ImportController = __decorate([
    (0, common_1.Controller)('import'),
    __metadata("design:paramtypes", [import_service_1.ImportService])
], ImportController);
//# sourceMappingURL=import.controller.js.map