import { IsEmail, IsOptional, MaxLength } from 'class-validator';
import { Tour } from 'src/tours/entities/tour.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guideName: string;

  @Column()
  photo: string;

  @IsOptional()
  @IsEmail()
  @Column()
  email: string;

  @IsOptional()
  @Column()
  phoneNumber: string;

  @IsOptional()
  @Column()
  languages: string;

  @Column()
  @MaxLength(2500)
  description: string;

  @OneToMany(() => Tour, (tour) => tour.category)
  tours: Tour;
}
