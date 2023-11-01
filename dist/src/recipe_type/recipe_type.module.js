"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeTypeModule = void 0;
const common_1 = require("@nestjs/common");
const recipe_type_service_1 = require("./recipe_type.service");
const recipe_type_controller_1 = require("./recipe_type.controller");
const recipe_type_entity_1 = require("./entities/recipe_type.entity");
const typeorm_1 = require("@nestjs/typeorm");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
const type_entity_1 = require("../type/entities/type.entity");
const lib_1 = require("../common/lib");
let RecipeTypeModule = class RecipeTypeModule {
};
exports.RecipeTypeModule = RecipeTypeModule;
exports.RecipeTypeModule = RecipeTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([recipe_type_entity_1.RecipeType, recipe_entity_1.Recipe, type_entity_1.Type])],
        controllers: [recipe_type_controller_1.RecipeTypeController],
        providers: [recipe_type_service_1.RecipeTypeService, lib_1.MessageService],
    })
], RecipeTypeModule);
//# sourceMappingURL=recipe_type.module.js.map