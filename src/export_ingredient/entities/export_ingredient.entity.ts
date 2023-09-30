import { Export } from 'src/export/entities/export.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExportIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @ManyToOne(() => Export, (item) => item.export_ingredients)
  export: Export;

  @ManyToOne(() => Ingredient, (item) => item.export_ingredients)
  ingredient: Ingredient;
}
