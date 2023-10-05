import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { Export } from './entities/export.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ExportIngredient } from 'src/export_ingredient/entities/export_ingredient.entity';
import {
  CheckCreateExport,
  CheckExistExport,
} from 'src/common/middlewares/middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([Export, Ingredient, ExportIngredient])],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistExport)
      .exclude('export/ingredient')
      .forRoutes(
        { path: 'export/:id', method: RequestMethod.ALL },
        { path: 'export/complete/:id', method: RequestMethod.ALL },
        { path: 'export/ingredient/:id', method: RequestMethod.ALL },
      );
  }
}
