import { Staff } from 'src/staff/entities/staff.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  role: number;

  @OneToMany(() => User, (item) => item.account)
  user: User;

  @OneToMany(() => Staff, (item) => item.account)
  staff: Staff;
}
