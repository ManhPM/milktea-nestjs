import { CartProduct } from 'src/cart_product/entities/cart_product.entity';
import { InvoiceProduct } from 'src/invoice_product/entities/invoice_product.entity';
import { ProductRecipe } from 'src/product_recipe/entities/product_recipe.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;

  @Column()
  productString: string;

  @OneToMany(() => CartProduct, (item) => item.product)
  cart_products: CartProduct[];

  @OneToMany(() => InvoiceProduct, (item) => item.product)
  invoice_products: InvoiceProduct[];

  @OneToMany(() => ProductRecipe, (item) => item.product)
  product_recipes: ProductRecipe[];
}
