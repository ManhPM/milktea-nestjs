import { Account } from 'src/account/entities/account.entity';
import { CartProduct } from 'src/cart_product/entities/cart_product.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Review } from 'src/review/entities/review.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  photo: string;

  @OneToMany(() => CartProduct, (item) => item.user)
  cart_products: CartProduct[];

  @ManyToOne(() => Account, (item) => item.user)
  account: Account;

  @OneToMany(() => Invoice, (item) => item.user)
  invoices: Invoice[];

  @OneToMany(() => Wishlist, (item) => item.user)
  wishlists: Wishlist[];

  @OneToMany(() => Review, (item) => item.user)
  reviews: Review[];
}
