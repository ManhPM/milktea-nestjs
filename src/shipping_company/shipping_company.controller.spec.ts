import { Test, TestingModule } from '@nestjs/testing';
import { ShippingCompanyController } from './shipping_company.controller';
import { ShippingCompanyService } from './shipping_company.service';

describe('ShippingCompanyController', () => {
  let controller: ShippingCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingCompanyController],
      providers: [ShippingCompanyService],
    }).compile();

    controller = module.get<ShippingCompanyController>(ShippingCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
