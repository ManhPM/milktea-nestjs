import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  isActive: number;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  image: string;

  @Column()
  updateAt: Date;

  @Column()
  upSizePrice: number;
}
