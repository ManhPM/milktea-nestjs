import { Test, TestingModule } from '@nestjs/testing';
import { ImportIngredientController } from './import_ingredient.controller';
import { ImportIngredientService } from './import_ingredient.service';

describe('ImportIngredientController', () => {
  let controller: ImportIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportIngredientController],
      providers: [ImportIngredientService],
    }).compile();

    controller = module.get<ImportIngredientController>(ImportIngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
