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
exports.ExportIngredientService = void 0;
const common_1 = require("@nestjs/common");
const export_ingredient_entity_1 = require("./entities/export_ingredient.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ExportIngredientService = class ExportIngredientService {
    constructor(exportIngredientRepository) {
        this.exportIngredientRepository = exportIngredientRepository;
    }
    create(createExportIngredientDto) {
        return 'This action adds a new exportIngredient';
    }
    findAll() {
        return `This action returns all exportIngredient`;
    }
    findOne(id) {
        return `This action returns a #${id} exportIngredient`;
    }
    update(id, updateExportIngredientDto) {
        return `This action updates a #${id} exportIngredient`;
    }
    remove(id) {
        return `This action removes a #${id} exportIngredient`;
    }
};
exports.ExportIngredientService = ExportIngredientService;
exports.ExportIngredientService = ExportIngredientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(export_ingredient_entity_1.ExportIngredient)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExportIngredientService);
//# sourceMappingURL=export_ingredient.service.js.map