import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { Import } from './entities/import.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ImportIngredient } from 'src/import_ingredient/entities/import_ingredient.entity';
import { CheckExistImport } from 'src/common/middlewares/middlewares';
import {
  validateCompleteImportExport,
  validateCreateImportIngredient,
  validateDeleteImportIngredient,
  validateFromDateToDate,
} from 'src/common/middlewares/validate';
import { Export } from 'src/export/entities/export.entity';
import { ExportService } from 'src/export/export.service';
import { ExportIngredient } from 'src/export_ingredient/entities/export_ingredient.entity';
import { ExportIngredientService } from 'src/export_ingredient/export_ingredient.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { MessageService } from 'src/common/lib';
import { ShippingCompanyService } from 'src/shipping_company/shipping_company.service';
import { ShippingCompany } from 'src/shipping_company/entities/shipping_company.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Import,
      Ingredient,
      ImportIngredient,
      Export,
      ExportIngredient,
      ShippingCompany,
      Shop,
      Recipe,
    ]),
  ],
  controllers: [ImportController],
  providers: [
    ImportService,
    ExportService,
    ExportIngredientService,
    IngredientService,
    MessageService,
    ShippingCompanyService,
  ],
})
export class ImportModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistImport)
      .exclude('import/ingredient')
      .forRoutes(
        { path: 'import/:id', method: RequestMethod.ALL },
        { path: 'import/complete/:id', method: RequestMethod.ALL },
        { path: 'import/ingredient/:id', method: RequestMethod.ALL },
      );
    consumer
      .apply(validateCompleteImportExport)
      .forRoutes({ path: 'import/complete/:id', method: RequestMethod.GET });
    consumer
      .apply(validateCreateImportIngredient)
      .forRoutes({ path: 'import/ingredient', method: RequestMethod.POST });
    consumer
      .apply(validateDeleteImportIngredient)
      .forRoutes({ path: 'import/ingredient', method: RequestMethod.DELETE });
    consumer
      .apply(validateFromDateToDate)
      .forRoutes({ path: 'import', method: RequestMethod.GET });
  }
}
