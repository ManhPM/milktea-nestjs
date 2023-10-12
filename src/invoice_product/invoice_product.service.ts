import { Injectable } from '@nestjs/common';
import { CreateInvoiceProductDto } from './dto/create-invoice_product.dto';
import { UpdateInvoiceProductDto } from './dto/update-invoice_product.dto';
import { InvoiceProduct } from './entities/invoice_product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

@Injectable()
export class InvoiceProductService {
  constructor(
    @InjectRepository(InvoiceProduct)
    readonly invoiceProductRepository: Repository<InvoiceProduct>,
  ) {}
  create(createInvoiceProductDto: CreateInvoiceProductDto) {
    return 'This action adds a new invoiceProduct';
  }

  async findAll(id: number): Promise<any> {
    return '...';
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceProduct`;
  }

  update(id: number, updateInvoiceProductDto: UpdateInvoiceProductDto) {
    return `This action updates a #${id} invoiceProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceProduct`;
  }
}
