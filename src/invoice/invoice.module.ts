import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceProduct } from 'src/invoice_product/entities/invoice_product.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { CartProduct } from 'src/cart_product/entities/cart_product.entity';
import { User } from 'src/user/entities/user.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Product } from 'src/product/entities/product.entity';
import { ShippingCompany } from 'src/shipping_company/entities/shipping_company.entity';
import { CheckExistInvoice } from 'src/common/middlewares/middlewares';
import {
  validateCheckOut,
  validateStatistical,
} from 'src/common/middlewares/validate';
import { ShippingCompanyService } from 'src/shipping_company/shipping_company.service';
import { ExportService } from 'src/export/export.service';
import { Export } from 'src/export/entities/export.entity';
import { ExportIngredient } from 'src/export_ingredient/entities/export_ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      InvoiceProduct,
      Ingredient,
      CartProduct,
      User,
      Shop,
      Product,
      ShippingCompany,
      Export,
      ExportIngredient,
    ]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, ShippingCompanyService, ExportService],
})
export class InvoiceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistInvoice)
      .exclude('invoice/statistical', 'invoice/checkout')
      .forRoutes(
        { path: 'invoice/:id', method: RequestMethod.ALL },
        { path: 'invoice/.*/:id', method: RequestMethod.ALL },
      );
    consumer
      .apply(validateCheckOut)
      .forRoutes({ path: 'invoice/checkout', method: RequestMethod.POST });
    consumer
      .apply(validateStatistical)
      .forRoutes({ path: 'invoice/statistical', method: RequestMethod.POST });
  }
}
