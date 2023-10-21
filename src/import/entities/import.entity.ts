import { ImportIngredient } from 'src/import_ingredient/entities/import_ingredient.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Import {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  isCompleted: number;

  @Column()
  total: number;

  @Column()
  description: string;

  @ManyToOne(() => Staff, (item) => item.imports)
  staff: Staff;

  @OneToMany(() => ImportIngredient, (item) => item.import)
  import_ingredients: ImportIngredient[];
}
