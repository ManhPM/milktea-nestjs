import { RefundPaymentDto } from './dto/refund-invoice.dto';
import {
  Injectable,
  Body,
  Ip,
  HttpException,
  Query,
  Request,
} from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'qs';
import vnpayConfig from '../../config/vnpayConfig';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, Like, Repository } from 'typeorm';
import { FilterInvoiceDto } from './dto/filter-invoice.dto';
import { InvoiceProduct } from 'src/invoice_product/entities/invoice_product.entity';
import { CartProduct } from 'src/cart_product/entities/cart_product.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { User } from 'src/user/entities/user.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Product } from 'src/product/entities/product.entity';
import { ShippingCompany } from 'src/shipping_company/entities/shipping_company.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceProduct)
    readonly invoiceProductRepository: Repository<InvoiceProduct>,
    @InjectRepository(Ingredient)
    readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(CartProduct)
    readonly cartProductRepository: Repository<CartProduct>,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
    @InjectRepository(Shop)
    readonly shopRepository: Repository<Shop>,
    @InjectRepository(Product)
    readonly productRepository: Repository<Product>,
    @InjectRepository(ShippingCompany)
    readonly shippingCompanyRepository: Repository<ShippingCompany>,
    private dataSource: DataSource,
  ) {}
  create(createInvoiceDto: CreateInvoiceDto) {
    return 'This action adds a new invoice';
  }

  async checkCreate(@Request() req) {
    try {
      return await this.invoiceRepository.find({
        where: {
          user: Like('%' + req.user[0].id + '%'),
          isPaid: 0,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra khi tạo mới hoá đơn',
        },
        500,
      );
    }
  }

  async handlePayment(@Body('id_order') id_order: number, @Ip() ip) {
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: {
          id: id_order,
        },
      });
      if (invoice) {
        if (invoice.isPaid != 0) {
          throw new HttpException(
            {
              message: 'Hoá đơn của bạn đã được thanh toán',
            },
            400,
          );
        } else if (invoice.status == 4) {
          throw new HttpException(
            {
              message: 'Hoá đơn của bạn đã huỷ',
            },
            400,
          );
        } else {
          process.env.TZ = 'Asia/Ho_Chi_Minh';

          const date = new Date();
          const createDate = moment(date).format('YYYYMMDDHHmmss');

          const ipAddr = ip;

          const tmnCode = vnpayConfig.vnp_TmnCode;
          const secretKey = vnpayConfig.vnp_HashSecret;
          let vnpUrl = vnpayConfig.vnp_Url;
          const returnUrl = vnpayConfig.vnp_ReturnUrl;
          const bankCode = 'NCB';
          const locale = 'vn';
          const currCode = 'VND';
          let vnp_Params = {};
          vnp_Params['vnp_Version'] = '2.1.0';
          vnp_Params['vnp_Command'] = 'pay';
          vnp_Params['vnp_TmnCode'] = tmnCode;
          vnp_Params['vnp_Locale'] = locale;
          vnp_Params['vnp_CurrCode'] = currCode;
          vnp_Params['vnp_TxnRef'] = id_order;
          vnp_Params['vnp_OrderInfo'] =
            'Thanh toán cho mã đơn hàng:' + id_order;
          vnp_Params['vnp_OrderType'] = 'other';
          vnp_Params['vnp_Amount'] = invoice.total * 100;
          vnp_Params['vnp_ReturnUrl'] = returnUrl;
          vnp_Params['vnp_IpAddr'] = ipAddr;
          vnp_Params['vnp_CreateDate'] = createDate;
          vnp_Params['vnp_BankCode'] = bankCode;
          // if (bankCode !== null && bankCode !== '') {
          //   vnp_Params['vnp_BankCode'] = bankCode;
          // }
          vnp_Params = this.sortObject(vnp_Params);

          const signData = querystring.stringify(vnp_Params, { encode: false });

          const hmac = crypto.createHmac('sha512', secretKey);
          const signed = hmac
            .update(new Buffer(signData, 'utf-8'))
            .digest('hex');
          vnp_Params['vnp_SecureHash'] = signed;
          vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

          return {
            data: vnpUrl,
          };
        }
      } else {
        throw new HttpException(
          {
            message: 'Lỗi thanh toán',
          },
          400,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi thanh toán',
        },
        500,
      );
    }
  }

  async handlePaymentReturn(@Query() vnp_Params: any) {
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const id_order = vnp_Params.vnp_TxnRef;
    const amount = vnp_Params.vnp_Amount / 100;
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: {
          id: id_order,
        },
      });
      if (invoice.isPaid == 0 && amount == invoice.total) {
        await this.invoiceRepository.update(invoice.id, {
          isPaid: 1,
        });
        return {
          message: 'Thanh toán thành công',
        };
      } else {
        throw new HttpException(
          {
            message: 'Lỗi thanh toán',
          },
          400,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi thanh toán',
        },
        500,
      );
    }
  }

  async handleRefund(@Ip() ip, @Body() item: RefundPaymentDto) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const date = new Date();

    const vnp_TmnCode = vnpayConfig.vnp_TmnCode;
    const secretKey = vnpayConfig.vnp_HashSecret;
    const vnp_Api = vnpayConfig.vnp_Api;

    const vnp_TxnRef = item.id_order;
    const vnp_TransactionDate = item.transDate;
    const vnp_Amount = item.amount * 100;
    const vnp_TransactionType = item.transType;
    const vnp_CreateBy = item.user;

    const vnp_RequestId = moment(date).format('HHmmss');
    const vnp_Version = '2.1.0';
    const vnp_Command = 'refund';
    const vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;

    const vnp_IpAddr = ip;

    const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    const vnp_TransactionNo = '0';

    const data =
      vnp_RequestId +
      '|' +
      vnp_Version +
      '|' +
      vnp_Command +
      '|' +
      vnp_TmnCode +
      '|' +
      vnp_TransactionType +
      '|' +
      vnp_TxnRef +
      '|' +
      vnp_Amount +
      '|' +
      vnp_TransactionNo +
      '|' +
      vnp_TransactionDate +
      '|' +
      vnp_CreateBy +
      '|' +
      vnp_CreateDate +
      '|' +
      vnp_IpAddr +
      '|' +
      vnp_OrderInfo;

    const hmac = crypto.createHmac('sha512', secretKey);
    const vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest('hex');

    const dataObj = {
      vnp_RequestId: vnp_RequestId,
      vnp_Version: vnp_Version,
      vnp_Command: vnp_Command,
      vnp_TmnCode: vnp_TmnCode,
      vnp_TransactionType: vnp_TransactionType,
      vnp_TxnRef: vnp_TxnRef,
      vnp_Amount: vnp_Amount,
      vnp_TransactionNo: vnp_TransactionNo,
      vnp_CreateBy: vnp_CreateBy,
      vnp_OrderInfo: vnp_OrderInfo,
      vnp_TransactionDate: vnp_TransactionDate,
      vnp_CreateDate: vnp_CreateDate,
      vnp_IpAddr: vnp_IpAddr,
      vnp_SecureHash: vnp_SecureHash,
    };

    await axios
      .post(vnp_Api, dataObj, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        return {
          message: `Hoàn tiền thành công ${response.data}`,
        };
      })
      .catch((error) => {
        console.log(error);
        throw new HttpException(
          {
            message: error,
          },
          500,
        );
      });
    return {
      message: `Hoàn tiền thành công`,
    };
  }

  sortObject(obj: { [key: string]: any }): { [key: string]: any } {
    const sorted: { [key: string]: any } = {};
    const str: string[] = [];
    let key: string;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (let i = 0; i < str.length; i++) {
      sorted[str[i]] = encodeURIComponent(obj[str[i]]).replace(/%20/g, '+');
    }
    return sorted;
  }

  async findAll(query: FilterInvoiceDto): Promise<any> {
    try {
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
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi lấy danh sách đơn hàng',
        },
        500,
      );
    }
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
      throw new HttpException(
        {
          message: 'Lỗi lấy thông tin đơn hàng',
        },
        500,
      );
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
      throw new HttpException(
        {
          message: 'Lỗi lấy đơn hàng hiện tại',
        },
        500,
      );
    }
  }

  async checkout(item: CreateInvoiceDto, @Request() req) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    item.status = 0;
    item.isPaid = 0;
    item.total = 0;
    const date = new Date();
    date.setHours(date.getHours() + 7);
    item.date = date;
    try {
      const shippingCompany = await this.shippingCompanyRepository.findOne({
        where: {
          id: item.shippingCompanyId,
        },
      });
      const user = await this.userRepository.findOne({
        where: {
          id: req.user.id,
        },
      });
      const invoice = await this.invoiceRepository.save({
        ...item,
        user,
        shippingCompany,
      });
      const cartProducts = await this.cartProductRepository.find({
        where: {
          user: req.user.id,
        },
        relations: ['user', 'product.product_recipes.recipe'],
      });
      let total = 0;
      for (const cartProduct of cartProducts) {
        let price = 0;
        for (const productRecipe of cartProduct.product.product_recipes) {
          total += cartProduct.quantity * productRecipe.recipe.price;
          price += cartProduct.quantity * productRecipe.recipe.price;
        }
        const product = await this.productRepository.findOne({
          where: {
            id: cartProduct.product.id,
          },
        });
        if (cartProduct.size != 0) {
          await this.invoiceProductRepository.save({
            size: cartProduct.size,
            quantity: cartProduct.quantity,
            price: price * 1000,
            invoice: invoice,
            product: product,
            isReviewed: 0,
          });
        } else {
          await this.invoiceProductRepository.save({
            size: 0,
            quantity: cartProduct.quantity,
            price: price * 1000,
            invoice: invoice,
            product: product,
            isReviewed: 0,
          });
        }
        if (cartProduct.size != 0) {
          const shop = await this.shopRepository.find({});
          total += shop[0].upSizePrice;
        }
      }
      await this.invoiceRepository.update(invoice.id, {
        total: total * 1000,
      });
      await queryRunner.commitTransaction();
      return {
        message: 'Đặt hàng thành công',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          message: 'Lỗi đặt hàng',
        },
        500,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async confirmInvoice(id: number, @Request() req) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const invoiceProducts = await this.invoiceProductRepository.find({
        where: {
          invoice: Like('%' + id + '%'),
        },
        relations: [
          'product.product_recipes.recipe.recipe_ingredients.ingredient',
        ],
      });
      for (const invoiceProduct of invoiceProducts) {
        for (const productRecipe of invoiceProduct.product.product_recipes) {
          for (const recipeIngredient of productRecipe.recipe
            .recipe_ingredients) {
            const decreQuantity =
              recipeIngredient.quantity * invoiceProduct.quantity;
            await this.ingredientRepository.decrement(
              { id: recipeIngredient.ingredient.id },
              'quantity',
              decreQuantity,
            );
          }
        }
      }
      await this.invoiceRepository.update(id, {
        status: 1,
        staff: req.user.id,
      });
      await queryRunner.commitTransaction();
      return {
        message: 'Xác nhận đơn hàng',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        message: error.message,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async cancelInvoice(id: number, @Request() req) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: {
          id: id,
        },
      });
      if (invoice.status == 0) {
        await this.invoiceRepository.update(id, {
          status: 4,
        });
        return {
          message: 'Huỷ đơn hàng thành công',
        };
      } else {
        if (req.user.role != 0 && invoice.status != 0 && invoice.status != 4) {
          const invoiceProducts = await this.invoiceProductRepository.find({
            where: {
              invoice: Like('%' + id + '%'),
            },
            relations: [
              'product.product_recipes.recipe.recipe_ingredients.ingredient',
            ],
          });
          for (const invoiceProduct of invoiceProducts) {
            for (const productRecipe of invoiceProduct.product
              .product_recipes) {
              for (const recipeIngredient of productRecipe.recipe
                .recipe_ingredients) {
                const decreQuantity =
                  recipeIngredient.quantity * invoiceProduct.quantity;
                await this.ingredientRepository.increment(
                  { id: recipeIngredient.ingredient.id },
                  'quantity',
                  decreQuantity,
                );
              }
            }
          }
          await this.invoiceRepository.update(id, {
            status: 4,
          });
          await queryRunner.commitTransaction();
          return {
            message: 'Huỷ đơn hàng thành công',
          };
        } else {
          await queryRunner.rollbackTransaction();
          throw new HttpException(
            {
              message: 'Đơn hàng này không thể huỷ',
            },
            400,
          );
        }
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          message: 'Lỗi huỷ đơn hàng',
        },
        500,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async receiveInvoice(id: number) {
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: {
          id: id,
        },
      });
      if (invoice.status == 1) {
        await this.invoiceRepository.update(id, {
          status: 2,
        });
        return {
          message: 'Đã nhận đơn hàng, hãy giao cho khách',
        };
      } else {
        return {
          message: 'Đơn hàng này không thể mang đi giao',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi nhận đơn hàng để giao',
        },
        500,
      );
    }
  }

  async completeInvoice(id: number) {
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: {
          id: id,
        },
      });
      if (invoice.status == 2) {
        await this.invoiceRepository.update(id, {
          status: 3,
          isPaid: 1,
        });
        return {
          message: 'Hoàn thành đơn hàng',
        };
      } else {
        return {
          message: 'Đơn hàng này không thể hoàn thành',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi hoàn thành đơn hàng',
        },
        500,
      );
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.invoiceRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi kiểm tra tồn tại hoá đơn',
        },
        500,
      );
    }
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
