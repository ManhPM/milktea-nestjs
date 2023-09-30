import { Injectable, Request, HttpStatus } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { FilterInvoiceDto } from './dto/filter-invoice.dto';
import { InvoiceProduct } from 'src/invoice_product/entities/invoice_product.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceProduct)
    readonly invoiceProductRepository: Repository<InvoiceProduct>,
  ) {}
  create(createInvoiceDto: CreateInvoiceDto) {
    return 'This action adds a new invoice';
  }

  async findAll(query: FilterInvoiceDto): Promise<any> {
    const status = query.status;
    const date = query.date;
    let res = [];
    let total = 0;
    const today = new Date(date);
    today.setHours(today.getHours() + 7);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (status) {
      if (date) {
        [res, total] = await this.invoiceRepository.findAndCount({
          where: {
            status,
            date: Between(today, tomorrow),
          },
        });
      } else {
        [res, total] = await this.invoiceRepository.findAndCount({
          where: {
            status,
          },
        });
      }
    } else {
      if (date) {
        [res, total] = await this.invoiceRepository.findAndCount({
          where: {
            date: Between(today, tomorrow),
          },
        });
      } else {
        [res, total] = await this.invoiceRepository.findAndCount({});
      }
    }
    return {
      data: res,
      total,
    };
  }

  async findOne(id: number) {
    try {
      const [res, total] = await this.invoiceRepository
        .createQueryBuilder('invoice')
        .leftJoinAndSelect('invoice.user', 'user')
        .leftJoinAndSelect('invoice.staff', 'staff')
        .leftJoinAndSelect('invoice.invoice_products', 'invoice_products')
        .leftJoinAndSelect('invoice_products.product', 'product')
        .leftJoinAndSelect('product.product_recipes', 'product_recipes')
        .leftJoinAndSelect('product_recipes.recipe', 'recipe')
        .leftJoinAndSelect('user.account', 'account')
        .select([
          'invoice',
          'user',
          'account',
          'account.phone',
          'invoice_products',
          'product',
          'product_recipes',
          'recipe',
        ])
        .where('invoice.id = :id', { id: id })
        .getMany();
      return {
        data: res,
        total,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async getCurrentInvoice(@Request() req) {
    try {
      const res = await this.invoiceRepository
        .createQueryBuilder('invoice')
        .leftJoinAndSelect('invoice.user', 'user')
        .leftJoinAndSelect('invoice.staff', 'staff')
        .leftJoinAndSelect('invoice.invoice_products', 'invoice_products')
        .leftJoinAndSelect('invoice_products.product', 'product')
        .leftJoinAndSelect('product.product_recipes', 'product_recipes')
        .leftJoinAndSelect('product_recipes.recipe', 'recipe')
        .leftJoinAndSelect('user.account', 'account')
        .select([
          'invoice',
          'user',
          'account',
          'account.phone',
          'invoice_products',
          'product',
          'product_recipes',
          'recipe',
        ])
        .where('invoice.status <= :status', { status: 3 })
        .andWhere('invoice.user.id = :user', { user: req.user[0].id })
        .getOne();
      return {
        data: res,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async confirmInvoice(id: number, @Request() req) {
    try {
      const invoiceProducts = await this.invoiceProductRepository.find({
        where: {
          invoice: Like('%' + id + '%'),
        },
        relations: ['product.product_recipes.recipe'],
      });

      // await this.invoiceRepository.update(id, {
      //   status: 1,
      //   staff: req.user.id,
      // });
      return {
        data: invoiceProducts,
        message: 'Xác nhận đơn hàng',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async cancelInvoice(id: number) {
    try {
      await this.invoiceRepository.update(id, {
        status: 4,
      });
      return {
        message: 'Huỷ đơn hàng thành công',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async receiveInvoice(id: number) {
    try {
      await this.invoiceRepository.update(id, {
        status: 2,
      });
      return {
        message: 'Đã nhận đơn hàng, hãy giao cho khách',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async completeInvoice(id: number) {
    try {
      await this.invoiceRepository.update(id, {
        status: 3,
      });
      return {
        message: 'Hoàn thành đơn hàng',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
