import { Test, TestingModule } from '@nestjs/testing';
import { UserCouponsController } from './user_coupons.controller';
import { UserCouponsService } from './user_coupons.service';

describe('UserCouponsController', () => {
  let controller: UserCouponsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCouponsController],
      providers: [UserCouponsService],
    }).compile();

    controller = module.get<UserCouponsController>(UserCouponsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
