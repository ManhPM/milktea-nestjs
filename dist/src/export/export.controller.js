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
exports.ExportController = void 0;
const common_1 = require("@nestjs/common");
const export_service_1 = require("./export.service");
const create_export_dto_1 = require("./dto/create-export.dto");
const update_export_dto_1 = require("./dto/update-export.dto");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_export_ingredient_dto_1 = require("../export_ingredient/dto/create-export_ingredient.dto");
const update_export_ingredient_dto_1 = require("../export_ingredient/dto/update-export_ingredient.dto");
let ExportController = class ExportController {
    constructor(exportService) {
        this.exportService = exportService;
    }
    create(createExportDto, req) {
        return this.exportService.create(createExportDto, req);
    }
    createIngredientExport(createExportDto) {
        return this.exportService.createIngredientExport(createExportDto);
    }
    deleteIngredientExport(item) {
        return this.exportService.deleteIngredientExport(item);
    }
    findAll(query) {
        return this.exportService.findAll(query);
    }
    findOne(id) {
        return this.exportService.findOne(+id);
    }
    completeExport(id) {
        return this.exportService.completeExport(+id);
    }
    findIngredientExport(id) {
        return this.exportService.findIngredientExport(+id);
    }
    update(id, updateExportDto) {
        return this.exportService.update(+id, updateExportDto);
    }
    remove(id) {
        return this.exportService.remove(+id);
    }
};
exports.ExportController = ExportController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_export_dto_1.CreateExportDto, Object]),
    __metadata("design:returntype", void 0)
], ExportController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Post)('ingredient'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_export_ingredient_dto_1.CreateExportIngredientDto]),
    __metadata("design:returntype", void 0)
], ExportController.prototype, "createIngredientExport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Delete)('ingredient'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_export_ingredient_dto_1.UpdateExportIngredientDto]),
    __metadata("design:returntype", void 0)
], ExportController.prototype, "deleteIngredientExport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExportController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExportController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)('complete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExportController.prototype, "completeExport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Get)('ingredient/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExportController.prototype, "findIngredientExport", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_export_dto_1.UpdateExportDto]),
    __metadata("design:returntype", void 0)
], ExportController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('2', '1'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExportController.prototype, "remove", null);
exports.ExportController = ExportController = __decorate([
    (0, common_1.Controller)('export'),
    __metadata("design:paramtypes", [export_service_1.ExportService])
], ExportController);
//# sourceMappingURL=export.controller.js.map