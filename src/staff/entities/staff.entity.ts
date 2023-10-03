import { Account } from 'src/account/entities/account.entity';
import { Export } from 'src/export/entities/export.entity';
import { Import } from 'src/import/entities/import.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import {
  Column,
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
