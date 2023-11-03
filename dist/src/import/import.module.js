"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportModule = void 0;
const common_1 = require("@nestjs/common");
const import_service_1 = require("./import.service");
const import_controller_1 = require("./import.controller");
const import_entity_1 = require("./entities/import.entity");
const typeorm_1 = require("@nestjs/typeorm");
const ingredient_entity_1 = require("../ingredient/entities/ingredient.entity");
const import_ingredient_entity_1 = require("../import_ingredient/entities/import_ingredient.entity");
const middlewares_1 = require("../common/middlewares/middlewares");
const validate_1 = require("../common/middlewares/validate");
const export_entity_1 = require("../export/entities/export.entity");
const export_service_1 = require("../export/export.service");
const export_ingredient_entity_1 = require("../export_ingredient/entities/export_ingredient.entity");
const export_ingredient_service_1 = require("../export_ingredient/export_ingredient.service");
const ingredient_service_1 = require("../ingredient/ingredient.service");
const lib_1 = require("../common/lib");
const shipping_company_service_1 = require("../shipping_company/shipping_company.service");
const shipping_company_entity_1 = require("../shipping_company/entities/shipping_company.entity");
const shop_entity_1 = require("../shop/entities/shop.entity");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
const recipe_ingredient_entity_1 = require("../recipe_ingredient/entities/recipe_ingredient.entity");
let ImportModule = class ImportModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistImport)
            .exclude('import/ingredient')
            .forRoutes({ path: 'import/:id', method: common_1.RequestMethod.ALL }, { path: 'import/complete/:id', method: common_1.RequestMethod.ALL }, { path: 'import/ingredient/:id', method: common_1.RequestMethod.ALL });
        consumer
            .apply(validate_1.validateCompleteImport)
            .forRoutes({ path: 'import/complete/:id', method: common_1.RequestMethod.GET });
        consumer
            .apply(validate_1.validateCreateImportIngredient)
            .forRoutes({ path: 'import/ingredient', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateDeleteImportIngredient)
            .forRoutes({ path: 'import/ingredient', method: common_1.RequestMethod.DELETE });
        consumer
            .apply(validate_1.validateFromDateToDate)
            .forRoutes({ path: 'import', method: common_1.RequestMethod.GET });
    }
};
exports.ImportModule = ImportModule;
exports.ImportModule = ImportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                import_entity_1.Import,
                ingredient_entity_1.Ingredient,
                import_ingredient_entity_1.ImportIngredient,
                export_entity_1.Export,
                export_ingredient_entity_1.ExportIngredient,
                shipping_company_entity_1.ShippingCompany,
                shop_entity_1.Shop,
                recipe_entity_1.Recipe,
                recipe_ingredient_entity_1.RecipeIngredient,
            ]),
        ],
        controllers: [import_controller_1.ImportController],
        providers: [
            import_service_1.ImportService,
            export_service_1.ExportService,
            export_ingredient_service_1.ExportIngredientService,
            ingredient_service_1.IngredientService,
            lib_1.MessageService,
            shipping_company_service_1.ShippingCompanyService,
        ],
    })
], ImportModule);
//# sourceMappingURL=import.module.js.map