import { Module } from '@nestjs/common';
import { InvoiceProductService } from './invoice_product.service';
import { InvoiceProductController } from './invoice_product.controller';
import { InvoiceProduct } from './entities/invoice_product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from 'src/common/lib';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceProduct])],
  controllers: [InvoiceProductController],
  providers: [InvoiceProductService, MessageService],
})
export class InvoiceProductModule {}
