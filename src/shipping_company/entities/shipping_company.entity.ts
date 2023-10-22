import { Invoice } from '../../invoice/entities/invoice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShippingCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  costPerKm: number;

  @Column()
  image: string;

  @Column()
  isActive: number;

  @OneToMany(() => Invoice, (item) => item.shippingCompany)
  invoices: Invoice[];
}
