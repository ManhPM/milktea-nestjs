"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportIngredientModule = void 0;
const common_1 = require("@nestjs/common");
const export_ingredient_service_1 = require("./export_ingredient.service");
const export_ingredient_controller_1 = require("./export_ingredient.controller");
const export_ingredient_entity_1 = require("./entities/export_ingredient.entity");
const typeorm_1 = require("@nestjs/typeorm");
const lib_1 = require("../common/lib");
let ExportIngredientModule = class ExportIngredientModule {
};
exports.ExportIngredientModule = ExportIngredientModule;
exports.ExportIngredientModule = ExportIngredientModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([export_ingredient_entity_1.ExportIngredient])],
        controllers: [export_ingredient_controller_1.ExportIngredientController],
        providers: [export_ingredient_service_1.ExportIngredientService, lib_1.MessageService],
    })
], ExportIngredientModule);
//# sourceMappingURL=export_ingredient.module.js.map