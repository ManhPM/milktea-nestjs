import { Module } from '@nestjs/common';
import { ShippingCompanyService } from './shipping_company.service';
import { ShippingCompanyController } from './shipping_company.controller';
import { ShippingCompany } from './entities/shipping_company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/shop/entities/shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingCompany, Shop])],
  controllers: [ShippingCompanyController],
  providers: [ShippingCompanyService],
})
export class ShippingCompanyModule {}
