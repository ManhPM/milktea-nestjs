import { Test, TestingModule } from '@nestjs/testing';
import { ProductRecipeController } from './product_recipe.controller';
import { ProductRecipeService } from './product_recipe.service';

describe('ProductRecipeController', () => {
  let controller: ProductRecipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductRecipeController],
      providers: [ProductRecipeService],
    }).compile();

    controller = module.get<ProductRecipeController>(ProductRecipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
