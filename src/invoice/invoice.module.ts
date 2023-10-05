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
    ]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistInvoice)
      .forRoutes(
        { path: 'invoice/:id', method: RequestMethod.GET },
        { path: 'invoice/.*/:id', method: RequestMethod.GET },
      );
  }
}
