import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceProductController } from './invoice_product.controller';
import { InvoiceProductService } from './invoice_product.service';

describe('InvoiceProductController', () => {
  let controller: InvoiceProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceProductController],
      providers: [InvoiceProductService],
    }).compile();

    controller = module.get<InvoiceProductController>(InvoiceProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
