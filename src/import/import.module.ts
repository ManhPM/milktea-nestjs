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
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { ImportIngredient } from '../import_ingredient/entities/import_ingredient.entity';
import { CheckExistImport } from '../common/middlewares/middlewares';
import {
  validateCompleteImport,
  validateCreateImportIngredient,
  validateDeleteImportIngredient,
  validateFromDateToDate,
} from '../common/middlewares/validate';
import { Export } from '../export/entities/export.entity';
import { ExportService } from '../export/export.service';
import { ExportIngredient } from '../export_ingredient/entities/export_ingredient.entity';
import { ExportIngredientService } from '../export_ingredient/export_ingredient.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { MessageService } from '../common/lib';
import { ShippingCompanyService } from '../shipping_company/shipping_company.service';
import { ShippingCompany } from '../shipping_company/entities/shipping_company.entity';
import { Shop } from '../shop/entities/shop.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { RecipeIngredient } from '../recipe_ingredient/entities/recipe_ingredient.entity';

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
      RecipeIngredient,
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
      .apply(validateCompleteImport)
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
