import { CartProduct } from '../cart_product/entities/cart_product.entity';
import { ProductRecipe } from '../product_recipe/entities/product_recipe.entity';
import { Injectable, Request, HttpStatus, HttpException } from '@nestjs/common';
import { CreateCartProductDto } from './dto/create-cart_product.dto';
import { UpdateCartProductDto } from './dto/update-cart_product.dto';
import { DataSource, Like, Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { MessageService } from '../common/lib';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    readonly cartProductRepository: Repository<CartProduct>,
    @InjectRepository(Product)
    readonly productRepository: Repository<Product>,
    @InjectRepository(ProductRecipe)
    readonly productRecipeRepository: Repository<ProductRecipe>,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
    @InjectRepository(Recipe)
    readonly recipeRepository: Repository<Recipe>,
    private dataSource: DataSource,
    private readonly messageService: MessageService,
  ) {}

  async create(createCartProductDto: CreateCartProductDto, @Request() req) {
    const productString = createCartProductDto.productString;
    const recipeArray = createCartProductDto.productString.split(',');
    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        try {
          const user = await transactionalEntityManager
            .getRepository(User)
            .findOne({
              where: {
                id: req.user.id,
              },
            });
          let product = await transactionalEntityManager
            .getRepository(Product)
            .findOne({
              where: {
                productString: productString,
              },
            });
          if (!product) {
            product = await transactionalEntityManager
              .getRepository(Product)
              .save({
                size: createCartProductDto.size,
                productString: createCartProductDto.productString,
              });
            for (let i = 0; i < recipeArray.length; i++) {
              const recipe = await transactionalEntityManager
                .getRepository(Recipe)
                .findOne({
                  where: {
                    id: Number(recipeArray[i]),
                  },
                });
              if (i == 0) {
                await transactionalEntityManager
                  .getRepository(ProductRecipe)
                  .save({
                    isMain: 1,
                    recipe,
                    product,
                  });
              } else {
                await transactionalEntityManager
                  .getRepository(ProductRecipe)
                  .save({
                    isMain: 0,
                    recipe,
                    product,
                  });
              }
            }
          }
          const cartProduct = await transactionalEntityManager
            .getRepository(CartProduct)
            .findOne({
              where: {
                user,
                product,
              },
            });
          if (cartProduct) {
            await transactionalEntityManager
              .getRepository(CartProduct)
              .update(cartProduct.id, {
                size: createCartProductDto.size,
                quantity:
                  Number(cartProduct.quantity) +
                  Number(createCartProductDto.quantity),
                product,
                user,
              });
          } else {
            await transactionalEntityManager.getRepository(CartProduct).save({
              ...createCartProductDto,
              product,
              user,
            });
          }
          const message = await this.messageService.getMessage(
            'ADD_TO_CART_SUCCESS',
          );
          return {
            message: message,
          };
        } catch (error) {
          let message;
          if (error.response) {
            message = await this.messageService.getMessage(
              error.response.messageCode,
            );
            throw new HttpException(
              {
                message: message,
              },
              HttpStatus.BAD_REQUEST,
            );
          } else {
            message = await this.messageService.getMessage(
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
      },
    );
  }

  async update(
    id: number,
    createCartProductDto: CreateCartProductDto,
    @Request() req,
  ) {
    const productString = createCartProductDto.productString;

    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        try {
          const user = await transactionalEntityManager
            .getRepository(User)
            .findOne({
              where: {
                id: req.user.id,
              },
            });
          const product = await transactionalEntityManager
            .getRepository(Product)
            .findOne({
              where: {
                productString: productString,
              },
            });

          const currentProduct = await transactionalEntityManager
            .getRepository(CartProduct)
            .findOne({
              where: {
                product: Like(id),
                user: user,
              },
            });
          const cartProduct = await transactionalEntityManager
            .getRepository(CartProduct)
            .findOne({
              where: {
                user: user,
                product: product,
              },
            });
          if (cartProduct) {
            await transactionalEntityManager
              .getRepository(CartProduct)
              .update(cartProduct.id, {
                size: createCartProductDto.size,
                quantity: Number(createCartProductDto.quantity),
              });
          } else {
            await transactionalEntityManager
              .getRepository(CartProduct)
              .delete(currentProduct.id);
            await transactionalEntityManager.getRepository(CartProduct).save({
              ...createCartProductDto,
              product,
              user,
            });
          }
          const message =
            await this.messageService.getMessage('UPDATE_SUCCESS');
          return {
            message: message,
          };
        } catch (error) {
          let message;
          if (error.response) {
            message = await this.messageService.getMessage(
              error.response.messageCode,
            );
            throw new HttpException(
              {
                message: message,
              },
              HttpStatus.BAD_REQUEST,
            );
          } else {
            message = await this.messageService.getMessage(
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
      },
    );
  }

  async findAll(@Request() req): Promise<any> {
    try {
      const res = await this.cartProductRepository.find({
        where: {
          user: Like(req.user.id),
        },
        relations: ['product.product_recipes.recipe'],
      });
      for (let i = 0; i < res.length; i++) {
        res[i].product.product_recipes.sort((a, b) => b.isMain - a.isMain);
      }
      if (res[0]) {
        const data = [
          {
            id: 0,
            productId: 0,
            quantity: 0,
            size: 0,
            name: '',
            image: '',
            discount: 0,
            price: 0,
            isActive: 0,
            toppings: [
              {
                id: 0,
                name: '',
                image: '',
                price: 0,
              },
            ],
          },
        ];
        let totalCart = 0;
        for (let i = 0; i < res.length; i++) {
          let toppingPrice = 0;
          data[i] = {
            productId: res[i].product.id,
            id: res[i].product.product_recipes[0].recipe.id,
            quantity: res[i].quantity,
            size: res[i].size,
            name: res[i].product.product_recipes[0].recipe.name,
            discount: res[i].product.product_recipes[0].recipe.discount,
            image: res[i].product.product_recipes[0].recipe.image,
            price:
              (res[i].product.product_recipes[0].recipe.price *
                res[i].product.product_recipes[0].recipe.discount) /
                100 +
              res[i].size,
            isActive: res[i].product.product_recipes[0].recipe.isActive,
            toppings: [],
          };
          if (res[i].size != 0) {
            totalCart += res[i].quantity * res[i].size;
          }
          for (let j = 1; j < res[i].product.product_recipes.length; j++) {
            data[i].toppings[j - 1] = {
              id: res[i].product.product_recipes[j].recipe.id,
              name: res[i].product.product_recipes[j].recipe.name,
              image: res[i].product.product_recipes[j].recipe.image,
              price:
                (res[i].product.product_recipes[j].recipe.price *
                  res[i].product.product_recipes[j].recipe.discount) /
                100,
            };
            totalCart +=
              (res[i].quantity *
                res[i].product.product_recipes[j].recipe.price *
                res[i].product.product_recipes[j].recipe.discount) /
              100;
            toppingPrice +=
              (res[i].product.product_recipes[j].recipe.price *
                res[i].product.product_recipes[j].recipe.price) /
              100;
          }
          totalCart +=
            (res[i].quantity *
              res[i].product.product_recipes[0].recipe.price *
              res[i].product.product_recipes[0].recipe.discount) /
            100;
          data[i].price =
            (res[i].product.product_recipes[0].recipe.price *
              res[i].product.product_recipes[0].recipe.discount) /
              100 +
            res[i].size +
            toppingPrice;
        }
        return {
          data: data,
          total: totalCart,
        };
      }
      return {
        data: null,
      };
    } catch (error) {
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async checkExist(id: number): Promise<any> {
    try {
      return await this.productRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cartProduct`;
  }

  async remove(id: number, @Request() req) {
    try {
      const item = await this.cartProductRepository.findOne({
        where: {
          user: Like(req.user.id),
          product: Like(id),
        },
        relations: ['user', 'product'],
      });
      if (!item) {
        throw new HttpException(
          {
            messageCode: 'CART_PRODUCT_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.cartProductRepository.delete(item.id);
      const message = await this.messageService.getMessage(
        'DELETE_FROM_CART_SUCCESS',
      );
      return {
        message: message,
      };
    } catch (error) {
      let message;
      if (error.response) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error);
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
