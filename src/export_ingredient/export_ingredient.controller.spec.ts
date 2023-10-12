import { Test, TestingModule } from '@nestjs/testing';
import { ExportIngredientController } from './export_ingredient.controller';
import { ExportIngredientService } from './export_ingredient.service';

describe('ExportIngredientController', () => {
  let controller: ExportIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportIngredientController],
      providers: [ExportIngredientService],
    }).compile();

    controller = module.get<ExportIngredientController>(ExportIngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
