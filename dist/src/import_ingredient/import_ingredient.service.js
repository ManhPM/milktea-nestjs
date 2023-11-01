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
exports.ImportIngredientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const import_ingredient_entity_1 = require("./entities/import_ingredient.entity");
const typeorm_2 = require("typeorm");
let ImportIngredientService = class ImportIngredientService {
    constructor(importIngredientRepository) {
        this.importIngredientRepository = importIngredientRepository;
    }
    create(createImportIngredientDto) {
        return 'This action adds a new importIngredient';
    }
    findAll() {
        return `This action returns all importIngredient`;
    }
    findOne(id) {
        return `This action returns a #${id} importIngredient`;
    }
    update(id, updateImportIngredientDto) {
        return `This action updates a #${id} importIngredient`;
    }
    remove(id) {
        return `This action removes a #${id} importIngredient`;
    }
};
exports.ImportIngredientService = ImportIngredientService;
exports.ImportIngredientService = ImportIngredientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(import_ingredient_entity_1.ImportIngredient)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ImportIngredientService);
//# sourceMappingURL=import_ingredient.service.js.map