import { Account } from '../../account/entities/account.entity';
import { Export } from '../../export/entities/export.entity';
import { Import } from '../../import/entities/import.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  birthday: Date;

  @Column()
  hiredate: Date;

  @Column()
  isActive: number;

  @ManyToOne(() => Account, (item) => item.staff)
  account: Account;

  @OneToMany(() => Import, (item) => item.staff)
  imports: Import[];

  @OneToMany(() => Export, (item) => item.staff)
  exports: Export[];

  @OneToMany(() => Invoice, (item) => item.staff)
  invoices: Invoice[];
}
