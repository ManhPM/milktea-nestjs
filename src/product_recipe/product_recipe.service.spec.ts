import { Test, TestingModule } from '@nestjs/testing';
import { ProductRecipeService } from './product_recipe.service';

describe('ProductRecipeService', () => {
  let service: ProductRecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRecipeService],
    }).compile();

    service = module.get<ProductRecipeService>(ProductRecipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
