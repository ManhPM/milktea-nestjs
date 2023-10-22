import { Import } from '../../import/entities/import.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImportIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Import, (item) => item.import_ingredients)
  import: Import;

  @ManyToOne(() => Ingredient, (item) => item.import_ingredients)
  ingredient: Ingredient;
}
