import { IsOptional, MaxLength } from 'class-validator';
import { Tour } from 'src/tours/entities/tour.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column({ unique: true })
  categoryName: string;

  @Column()
  @MaxLength(2500)
  description: string;

  @OneToMany(() => Tour, (tour) => tour.category)
  tours: Tour[];
}
