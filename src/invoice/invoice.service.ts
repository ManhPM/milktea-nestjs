import {
  Injectable,
  Body,
  Ip,
  HttpException,
  Query,
  Request,
  HttpStatus,
} from '@nestjs/common';

import * as querystring from 'qs';
import vnpayConfig from '../../config/vnpayConfig';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, LessThan, Like, Repository } from 'typeorm';
import { FilterInvoiceDto } from './dto/filter-invoice.dto';
import { InvoiceProduct } from 'src/invoice_product/entities/invoice_product.entity';
import { CartProduct } from 'src/cart_product/entities/cart_product.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { User } from 'src/user/entities/user.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Product } from 'src/product/entities/product.entity';
import { ShippingCompany } from 'src/shipping_company/entities/shipping_company.entity';
import { ThongKeDto } from './dto/thongke-invoice.dto';
import { MessageService } from 'src/common/lib';

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
    @InjectDataSource() private dataSource: DataSource,
    private readonly messageService: MessageService,
  ) {}

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
              messageCode: 'PAYMENT_ERROR',
            },
            HttpStatus.BAD_REQUEST,
          );
        } else if (invoice.status == 4) {
          throw new HttpException(
            {
              messageCode: 'PAYMENT_ERROR1',
            },
            HttpStatus.BAD_REQUEST,
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
            'Thanh toán cho mã đơn hàng: ' + id_order;
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
            messageCode: 'PAYMENT_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
        const message = await this.messageService.getMessage('PAYMENT_SUCCESS');
        return {
          message: message,
        };
      } else {
        throw new HttpException(
          {
            messageCode: 'PAYMENT_ERROR3',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async handleRefund(@Body('id_order') id_order: number, @Ip() ip) {
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: {
          id: id_order,
          isPaid: 1,
          paymentMethod: 'VNPAY',
          status: 0,
        },
      });
      if (invoice) {
        process.env.TZ = 'Asia/Ho_Chi_Minh';

        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');

        const ipAddr = ip;

        const tmnCode = vnpayConfig.vnp_TmnCode;
        const secretKey = vnpayConfig.vnp_HashSecret;
        let vnpUrl = vnpayConfig.vnp_Url;
        const returnUrl = vnpayConfig.vnp_RefundUrl;
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
        vnp_Params['vnp_OrderInfo'] = 'Hoàn tiền cho mã đơn hàng: ' + id_order;
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
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        return {
          data: vnpUrl,
        };
      } else {
        throw new HttpException(
          {
            messageCode: 'PAYMENT_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async handleRefundReturn(@Query() vnp_Params: any) {
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    try {
      const message = await this.messageService.getMessage('REFUND_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  async findAll(query: FilterInvoiceDto, @Request() req): Promise<any> {
    const status = query.status;
    const date = query.date;
    let res = [];
    let total = 0;
    const today = new Date(date);
    today.setHours(today.getHours() + 7);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    try {
      if (req.user[0].role == 0) {
        if (status) {
          if (date) {
            [res, total] = await this.invoiceRepository.findAndCount({
              where: {
                status,
                user: Like('%' + req.user[0].id + '%'),
                date: Between(today, tomorrow),
              },
            });
          } else {
            [res, total] = await this.invoiceRepository.findAndCount({
              where: {
                user: Like('%' + req.user[0].id + '%'),
                status,
              },
            });
          }
        } else {
          if (date) {
            [res, total] = await this.invoiceRepository.findAndCount({
              where: {
                user: Like('%' + req.user[0].id + '%'),
                date: Between(today, tomorrow),
              },
            });
          } else {
            [res, total] = await this.invoiceRepository.findAndCount({
              where: {
                user: Like('%' + req.user[0].id + '%'),
              },
            });
          }
        }
      } else {
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
      }
      return {
        data: res,
        total,
      };
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async thongKe(item: ThongKeDto): Promise<any> {
    const fromDate = item.fromDate;
    const toDate = item.toDate;
    let invoices = [];
    let revenue = 0;
    let countRecipes = 0;
    let countToppings = 0;
    let countInvoices = 0;
    const recipeCounts = {};
    const toppingCounts = {};
    try {
      [invoices, countInvoices] = await this.invoiceRepository.findAndCount({
        where: {
          date: Between(fromDate, toDate),
          status: 3,
        },
        relations: ['invoice_products.product.product_recipes.recipe'],
      });
      for (const invoice of invoices) {
        for (const invoiceProduct of invoice.invoice_products) {
          countRecipes += invoiceProduct.quantity;
          for (const productRecipe of invoiceProduct.product.product_recipes) {
            const name = productRecipe.recipe.name;
            const id = productRecipe.recipe.id;
            const image = productRecipe.recipe.image;
            const quantityProduct = invoiceProduct.quantity;
            if (productRecipe.isMain == 1) {
              if (recipeCounts[id]) {
                recipeCounts[id].count += quantityProduct;
              } else {
                recipeCounts[id] = {
                  count: quantityProduct,
                  name: name,
                  image: image,
                };
              }
            } else {
              countToppings += invoiceProduct.quantity;
              if (toppingCounts[id]) {
                toppingCounts[id].count += quantityProduct;
              } else {
                toppingCounts[id] = {
                  count: quantityProduct,
                  name: name,
                  image: image,
                };
              }
            }
          }
        }
        revenue += invoice.total;
      }
      const count = await this.dataSource.query(
        `SELECT COUNT(userId)/COUNT(id)*100 as percent FROM invoice WHERE status = 3 GROUP BY userId HAVING COUNT(userId) >= 2`,
      );

      return {
        percentCusReOrder: Number(count[0].percent),
        topNames: recipeCounts,
        topToppings: toppingCounts,
        revenue: revenue,
        countToppings: countToppings,
        countRecipes: countRecipes,
        countInvoices: countInvoices,
      };
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
    item.isPrepared = 0;
    const date = new Date();
    date.setHours(date.getHours() + 7);
    item.date = date;
    try {
      const checkCreate = await this.invoiceRepository.findOne({
        where: {
          user: Like('%' + req.user[0].id + '%'),
          isPaid: 0,
        },
      });
      if (!checkCreate) {
        const shippingCompany = await this.shippingCompanyRepository.findOne({
          where: {
            id: item.shippingCompanyId,
          },
        });
        const user = await this.userRepository.findOne({
          where: {
            id: req.user[0].id,
          },
        });
        const invoice = await this.invoiceRepository.save({
          ...item,
          user,
          shippingCompany,
        });
        const cartProducts = await this.cartProductRepository.find({
          where: {
            user: req.user[0].id,
          },
          relations: ['user', 'product.product_recipes.recipe'],
        });
        const shop = await this.shopRepository.find({});
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
              price: (price + shop[0].upSizePrice) * 1000,
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
            total += shop[0].upSizePrice * cartProduct.quantity;
          }
          await this.cartProductRepository.delete(cartProduct.id);
        }
        await this.invoiceRepository.update(invoice.id, {
          total: total * 1000,
        });
        await queryRunner.commitTransaction();
        const message =
          await this.messageService.getMessage('CHECKOUT_SUCCESS');
        return {
          message: message,
        };
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
        staff: req.user[0].id,
      });
      await queryRunner.commitTransaction();
      const message = await this.messageService.getMessage('CONFIRM_SUCCESS');
      return {
        message: message,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
        const message = await this.messageService.getMessage('CANCEL_SUCCESS');
        return {
          message: message,
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
          const message =
            await this.messageService.getMessage('CANCEL_SUCCESS');
          return {
            message: message,
          };
        } else {
          await queryRunner.rollbackTransaction();
          throw new HttpException(
            {
              messageCode: 'CANCEL_INVOICE_ERROR',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      let message = '';
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
      }
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      if (invoice.status == 1 && invoice.isPrepared == 1) {
        await this.invoiceRepository.update(id, {
          status: 2,
        });
        const message = await this.messageService.getMessage('RECEIVE_SUCCESS');
        return {
          message: message,
        };
      } else {
        throw new HttpException(
          {
            messageCode: 'RECEIVE_INVOICE_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      let message = '';
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
      }
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
        const message =
          await this.messageService.getMessage('COMPLETE_SUCCESS');
        return {
          message: message,
        };
      } else {
        throw new HttpException(
          {
            messageCode: 'COMPLETE_INVOICE_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      let message = '';
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
      }
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async prepareInvoice(id: number) {
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: {
          id: id,
        },
      });
      if (invoice.status == 1 && invoice.isPrepared == 0) {
        await this.invoiceRepository.update(id, {
          isPrepared: 1,
        });
        const message =
          await this.messageService.getMessage('PREPARED_SUCCESS');
        return {
          message: message,
        };
      } else {
        throw new HttpException(
          {
            messageCode: 'PREPARED_INVOICE_ERROR',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      let message = '';
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
      }
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.invoiceRepository.findOne({
        where: { id },
      });
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async handleAutoDeleteInvoice(): Promise<any> {
    try {
      const now = new Date();
      now.setHours(now.getHours() + 8);
      const unPaidInvoices = await this.invoiceRepository.find({
        where: {
          isPaid: 0,
          paymentMethod: 'VNPAY',
          date: LessThan(now),
        },
      });
      if (unPaidInvoices.length) {
        for (const unPaidInvoice of unPaidInvoices) {
          const invoiceProducts = await this.invoiceProductRepository.find({
            where: {
              invoice: Like('%' + unPaidInvoice.id + '%'),
            },
          });
          for (const invoiceProduct of invoiceProducts) {
            await this.invoiceProductRepository.delete(invoiceProduct.id);
          }
          await this.invoiceRepository.delete(unPaidInvoice.id);
        }
      }
    } catch (error) {
      const message = await this.messageService.getMessage(
        'INTERNAL_SERVER_ERROR',
      );
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
