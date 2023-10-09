import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { Ingredient } from './entities/ingredient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CheckCreateIngredient,
  CheckExistIngredient,
} from 'src/common/middlewares/middlewares';
import { validateCreateIngredient } from 'src/common/middlewares/validate';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistIngredient)
      .forRoutes({ path: 'ingredient/:id', method: RequestMethod.ALL });
    consumer
      .apply(validateCreateIngredient, CheckCreateIngredient)
      .forRoutes({ path: 'ingredient', method: RequestMethod.POST });
  }
}
