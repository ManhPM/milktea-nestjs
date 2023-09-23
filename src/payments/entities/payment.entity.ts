import { IsOptional, IsPositive, MaxLength } from 'class-validator';
import { Booking } from 'src/bookings/entities/booking.entity';
import { User } from 'src/users/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @IsPositive()
  @Column()
  amount: number;

  @Column()
  @MaxLength(2500)
  description: string;

  @IsOptional()
  @CreateDateColumn()
  paymentDate: Date;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ManyToOne(() => Booking, (booking) => booking.payments)
  booking: Booking;
}
