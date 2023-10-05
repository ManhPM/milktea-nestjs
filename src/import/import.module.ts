import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { Import } from './entities/import.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { ImportIngredient } from 'src/import_ingredient/entities/import_ingredient.entity';
import {
  CheckCreateImport,
  CheckExistImport,
} from 'src/common/middlewares/middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([Import, Ingredient, ImportIngredient])],
  controllers: [ImportController],
  providers: [ImportService],
})
export class ImportModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistImport)
      .exclude('import/ingredient')
      .forRoutes(
        { path: 'import/:id', method: RequestMethod.ALL },
        { path: 'import/complete/:id', method: RequestMethod.ALL },
        { path: 'import/ingredient/:id', method: RequestMethod.ALL },
      );
  }
}
