import { Test, TestingModule } from '@nestjs/testing';
import { UserCouponsService } from './user_coupons.service';

describe('UserCouponsService', () => {
  let service: UserCouponsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCouponsService],
    }).compile();

    service = module.get<UserCouponsService>(UserCouponsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
