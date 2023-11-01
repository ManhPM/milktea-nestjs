"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportIngredientModule = void 0;
const common_1 = require("@nestjs/common");
const import_ingredient_service_1 = require("./import_ingredient.service");
const import_ingredient_controller_1 = require("./import_ingredient.controller");
const typeorm_1 = require("@nestjs/typeorm");
const import_ingredient_entity_1 = require("./entities/import_ingredient.entity");
const lib_1 = require("../common/lib");
let ImportIngredientModule = class ImportIngredientModule {
};
exports.ImportIngredientModule = ImportIngredientModule;
exports.ImportIngredientModule = ImportIngredientModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([import_ingredient_entity_1.ImportIngredient])],
        controllers: [import_ingredient_controller_1.ImportIngredientController],
        providers: [import_ingredient_service_1.ImportIngredientService, lib_1.MessageService],
    })
], ImportIngredientModule);
//# sourceMappingURL=import_ingredient.module.js.map