import { Test, TestingModule } from '@nestjs/testing';
import { ExportIngredientService } from './export_ingredient.service';

describe('ExportIngredientService', () => {
  let service: ExportIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportIngredientService],
    }).compile();

    service = module.get<ExportIngredientService>(ExportIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
