import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { Export } from './entities/export.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { ExportIngredient } from '../export_ingredient/entities/export_ingredient.entity';
import { CheckExistExport } from '../common/middlewares/middlewares';
import {
  validateCompleteImportExport,
  validateCreateExportIngredient,
  validateDeleteExportIngredient,
  validateFromDateToDate,
} from '../common/middlewares/validate';
import { Import } from '../import/entities/import.entity';
import { ImportIngredient } from '../import_ingredient/entities/import_ingredient.entity';
import { ImportService } from '../import/import.service';
import { ImportIngredientService } from '../import_ingredient/import_ingredient.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { MessageService } from '../common/lib';
import { ShippingCompanyService } from '../shipping_company/shipping_company.service';
import { ShippingCompany } from '../shipping_company/entities/shipping_company.entity';
import { Shop } from '../shop/entities/shop.entity';
import { Recipe } from '../recipe/entities/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Export,
      Ingredient,
      ExportIngredient,
      Import,
      ImportIngredient,
      Ingredient,
      ShippingCompany,
      Shop,
      Recipe,
    ]),
  ],
  controllers: [ExportController],
  providers: [
    ExportService,
    ImportIngredientService,
    ImportService,
    IngredientService,
    MessageService,
    ShippingCompanyService,
  ],
})
export class ExportModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistExport)
      .exclude('export/ingredient')
      .forRoutes(
        { path: 'export/:id', method: RequestMethod.ALL },
        { path: 'export/complete/:id', method: RequestMethod.ALL },
        { path: 'export/ingredient/:id', method: RequestMethod.ALL },
      );
    consumer
      .apply(validateCompleteImportExport)
      .forRoutes({ path: 'export/complete/:id', method: RequestMethod.GET });
    consumer
      .apply(validateCreateExportIngredient)
      .forRoutes({ path: 'export/ingredient', method: RequestMethod.POST });
    consumer
      .apply(validateDeleteExportIngredient)
      .forRoutes({ path: 'export/ingredient', method: RequestMethod.DELETE });
    consumer
      .apply(validateFromDateToDate)
      .forRoutes({ path: 'export', method: RequestMethod.GET });
  }
}
