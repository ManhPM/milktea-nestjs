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
} from '../common/middlewares/middlewares';
import { validateCreateIngredient } from '../common/middlewares/validate';
import { MessageService } from '../common/lib';
import { RecipeIngredient } from '../recipe_ingredient/entities/recipe_ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, RecipeIngredient])],
  controllers: [IngredientController],
  providers: [IngredientService, MessageService],
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
