import { ExportIngredient } from 'src/export_ingredient/entities/export_ingredient.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Export {
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

  @OneToMany(() => ExportIngredient, (item) => item.export)
  export_ingredients: ExportIngredient[];
}
