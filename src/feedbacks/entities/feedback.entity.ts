import { IsOptional, MaxLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column()
  @MaxLength(2500)
  message: string;

  @ManyToOne(() => User, (user) => user.feedbacks)
  user: User;
}
