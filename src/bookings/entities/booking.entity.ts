import { IsOptional, IsPositive } from 'class-validator';
import { Payment } from 'src/payments/entities/payment.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { User } from 'src/users/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column()
  status: number;

  @IsOptional()
  @Column()
  guestSize: number;

  @IsOptional()
  @Column()
  @IsPositive()
  total: number;

  @IsOptional()
  @Column()
  startDate: Date;

  @IsOptional()
  @Column()
  endDate: Date;

  @IsOptional()
  @CreateDateColumn()
  createAt: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Tour, (tour) => tour.bookings)
  tour: Tour;

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];
}
