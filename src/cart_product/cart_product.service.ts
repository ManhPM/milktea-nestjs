import { CartProduct } from 'src/cart_product/entities/cart_product.entity';
import { ProductRecipe } from 'src/product_recipe/entities/product_recipe.entity';
import { Injectable, Request, HttpStatus, Res } from '@nestjs/common';
import { CreateCartProductDto } from './dto/create-cart_product.dto';
import { UpdateCartProductDto } from './dto/update-cart_product.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

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
  ) {}

  async create(createCartProductDto: CreateCartProductDto, @Request() req) {
    const productString = createCartProductDto.productString;
    const splitMain = productString.substring(2);
    const recipeString = splitMain.split(',');
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: req.user.id,
        },
      });
      let product = await this.productRepository.findOne({
        where: {
          productString: productString,
        },
      });
      if (!product) {
        product = await this.productRepository.save({
          ...createCartProductDto,
        });
        for (let i = 0; i < recipeString.length; i++) {
          const recipe = await this.recipeRepository.findOne({
            where: {
              id: Number(recipeString[i]),
            },
          });
          if (i == 0) {
            await this.productRecipeRepository.save({
              isMain: 1,
              recipe,
              product,
            });
          } else {
            await this.productRecipeRepository.save({
              isMain: 0,
              recipe,
              product,
            });
          }
        }
      }
      const cartProduct = await this.cartProductRepository.findOne({
        where: {
          user,
          product,
        },
      });
      if (cartProduct) {
        await this.cartProductRepository.update(cartProduct.id, {
          size: createCartProductDto.size,
          quantity:
            Number(cartProduct.quantity) +
            Number(createCartProductDto.quantity),
          product,
          user,
        });
      } else {
        await this.cartProductRepository.save({
          ...createCartProductDto,
          product,
          user,
        });
      }
      await queryRunner.commitTransaction();
      return {
        message: 'Đã thêm sản phẩm vào giỏ hàng',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        message: error.message,
      };
    } finally {
      // Đảm bảo rằng kết nối luôn được giải phóng
      await queryRunner.release();
    }
  }

  async findAll(@Request() req): Promise<any> {
    const [res, total] = await this.cartProductRepository.findAndCount({
      where: {
        user: req.user.id,
      },
      relations: ['product', 'product.recipe'],
    });
    return {
      data: res,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} cartProduct`;
  }

  async update(
    @Request() req,
    id: number,
    updateCartProductDto: UpdateCartProductDto,
  ): Promise<any> {
    try {
      const item = await this.cartProductRepository.findOne({
        where: {
          user: Like('%' + req.user[0].id + '%'),
          product: Like('%' + id + '%'),
        },
      });
      await this.cartProductRepository.update(item.id, {
        size: updateCartProductDto.size,
        quantity: updateCartProductDto.quantity,
        product: item.product,
        user: item.user,
      });
      return {
        message: 'Cập nhật thành công',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async remove(id: number, @Request() req) {
    try {
      const item = await this.cartProductRepository.findOne({
        where: {
          user: req.user[0].id,
          product: Like('%' + id + '%'),
        },
        relations: ['user', 'product'],
      });
      await this.cartProductRepository.delete({
        user: item.user,
        product: item.product,
      });
      return {
        message: 'Đã xoá khỏi giỏ hàng',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}
