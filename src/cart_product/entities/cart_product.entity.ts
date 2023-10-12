import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.cart_products)
  user: User;

  @ManyToOne(() => Product, (product) => product.cart_products)
  product: Product;
}
