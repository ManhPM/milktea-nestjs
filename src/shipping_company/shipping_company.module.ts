import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ShippingCompanyService } from './shipping_company.service';
import { ShippingCompanyController } from './shipping_company.controller';
import { ShippingCompany } from './entities/shipping_company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/shop/entities/shop.entity';
import {
  CheckCreateShippingCompany,
  CheckExistShippingCompany,
} from 'src/common/middlewares/middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingCompany, Shop])],
  controllers: [ShippingCompanyController],
  providers: [ShippingCompanyService],
})
export class ShippingCompanyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistShippingCompany)
      .forRoutes({ path: 'shipping-company/:id', method: RequestMethod.ALL });
    consumer
      .apply(CheckCreateShippingCompany)
      .forRoutes({ path: 'shipping-company', method: RequestMethod.POST });
  }
}
