"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportModule = void 0;
const common_1 = require("@nestjs/common");
const export_service_1 = require("./export.service");
const export_controller_1 = require("./export.controller");
const export_entity_1 = require("./entities/export.entity");
const typeorm_1 = require("@nestjs/typeorm");
const ingredient_entity_1 = require("../ingredient/entities/ingredient.entity");
const export_ingredient_entity_1 = require("../export_ingredient/entities/export_ingredient.entity");
const middlewares_1 = require("../common/middlewares/middlewares");
const validate_1 = require("../common/middlewares/validate");
const import_entity_1 = require("../import/entities/import.entity");
const import_ingredient_entity_1 = require("../import_ingredient/entities/import_ingredient.entity");
const import_service_1 = require("../import/import.service");
const import_ingredient_service_1 = require("../import_ingredient/import_ingredient.service");
const ingredient_service_1 = require("../ingredient/ingredient.service");
const lib_1 = require("../common/lib");
const shipping_company_service_1 = require("../shipping_company/shipping_company.service");
const shipping_company_entity_1 = require("../shipping_company/entities/shipping_company.entity");
const shop_entity_1 = require("../shop/entities/shop.entity");
const recipe_entity_1 = require("../recipe/entities/recipe.entity");
const recipe_ingredient_entity_1 = require("../recipe_ingredient/entities/recipe_ingredient.entity");
let ExportModule = class ExportModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistExport)
            .exclude('export/ingredient')
            .forRoutes({ path: 'export/:id', method: common_1.RequestMethod.ALL }, { path: 'export/complete/:id', method: common_1.RequestMethod.ALL }, { path: 'export/ingredient/:id', method: common_1.RequestMethod.ALL });
        consumer
            .apply(validate_1.validateCompleteImportExport)
            .forRoutes({ path: 'export/complete/:id', method: common_1.RequestMethod.GET });
        consumer
            .apply(validate_1.validateCreateExportIngredient)
            .forRoutes({ path: 'export/ingredient', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateDeleteExportIngredient)
            .forRoutes({ path: 'export/ingredient', method: common_1.RequestMethod.DELETE });
        consumer
            .apply(validate_1.validateFromDateToDate)
            .forRoutes({ path: 'export', method: common_1.RequestMethod.GET });
    }
};
exports.ExportModule = ExportModule;
exports.ExportModule = ExportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                export_entity_1.Export,
                ingredient_entity_1.Ingredient,
                export_ingredient_entity_1.ExportIngredient,
                import_entity_1.Import,
                import_ingredient_entity_1.ImportIngredient,
                ingredient_entity_1.Ingredient,
                shipping_company_entity_1.ShippingCompany,
                shop_entity_1.Shop,
                recipe_entity_1.Recipe,
                recipe_ingredient_entity_1.RecipeIngredient,
            ]),
        ],
        controllers: [export_controller_1.ExportController],
        providers: [
            export_service_1.ExportService,
            import_ingredient_service_1.ImportIngredientService,
            import_service_1.ImportService,
            ingredient_service_1.IngredientService,
            lib_1.MessageService,
            shipping_company_service_1.ShippingCompanyService,
        ],
    })
], ExportModule);
//# sourceMappingURL=export.module.js.map