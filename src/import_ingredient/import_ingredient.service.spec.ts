import { Test, TestingModule } from '@nestjs/testing';
import { ImportIngredientService } from './import_ingredient.service';

describe('ImportIngredientService', () => {
  let service: ImportIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportIngredientService],
    }).compile();

    service = module.get<ImportIngredientService>(ImportIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
