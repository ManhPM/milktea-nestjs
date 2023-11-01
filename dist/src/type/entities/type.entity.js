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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const recipe_entity_1 = require("../../recipe/entities/recipe.entity");
const recipe_type_entity_1 = require("../../recipe_type/entities/recipe_type.entity");
const typeorm_1 = require("typeorm");
let Type = class Type {
};
exports.Type = Type;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Type.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Type.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Type.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_type_entity_1.RecipeType, (item) => item.type),
    __metadata("design:type", Array)
], Type.prototype, "recipe_types", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_entity_1.Recipe, (item) => item.type),
    __metadata("design:type", Array)
], Type.prototype, "recipes", void 0);
exports.Type = Type = __decorate([
    (0, typeorm_1.Entity)()
], Type);
//# sourceMappingURL=type.entity.js.map