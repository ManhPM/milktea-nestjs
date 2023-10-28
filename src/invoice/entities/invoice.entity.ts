import { InvoiceProduct } from '../../invoice_product/entities/invoice_product.entity';
import { ShippingCompany } from '../../shipping_company/entities/shipping_company.entity';
import { Staff } from '../../staff/entities/staff.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  shippingFee: number;

  @Column()
  date: Date;

  @Column()
  status: number;

  @Column()
  paymentMethod: string;

  @Column()
  description: string;

  @Column()
  isPaid: number;

  @ManyToOne(() => User, (item) => item.invoices)
  user: User;

  @ManyToOne(() => Staff, (item) => item.invoices)
  staff: Staff;

  @ManyToOne(() => ShippingCompany, (item) => item.invoices)
  shippingCompany: ShippingCompany;

  @OneToMany(() => InvoiceProduct, (item) => item.invoice)
  invoice_products: InvoiceProduct[];
}
