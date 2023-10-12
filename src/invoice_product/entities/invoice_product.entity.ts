import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InvoiceProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  isReviewed: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoice_products)
  invoice: Invoice;

  @ManyToOne(() => Product, (product) => product.invoice_products)
  product: Product;
}
