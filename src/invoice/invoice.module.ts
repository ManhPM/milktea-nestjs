import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceProduct } from 'src/invoice_product/entities/invoice_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceProduct])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
