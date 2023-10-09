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
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ExportIngredient } from 'src/export_ingredient/entities/export_ingredient.entity';
import { CheckExistExport } from 'src/common/middlewares/middlewares';
import {
  validateCompleteImportExport,
  validateCreateExportIngredient,
  validateDeleteExportIngredient,
} from 'src/common/middlewares/validate';
import { Import } from 'src/import/entities/import.entity';
import { ImportIngredient } from 'src/import_ingredient/entities/import_ingredient.entity';
import { ImportService } from 'src/import/import.service';
import { ImportIngredientService } from 'src/import_ingredient/import_ingredient.service';
import { IngredientService } from 'src/ingredient/ingredient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Export,
      Ingredient,
      ExportIngredient,
      Import,
      ImportIngredient,
      Ingredient,
    ]),
  ],
  controllers: [ExportController],
  providers: [
    ExportService,
    ImportIngredientService,
    ImportService,
    IngredientService,
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
  }
}
