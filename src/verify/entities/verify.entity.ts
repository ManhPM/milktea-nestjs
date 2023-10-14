import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Verify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  verifyID: string;

  @Column()
  expireAt: Date;
}
