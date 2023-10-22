import { ExportIngredient } from '../../export_ingredient/entities/export_ingredient.entity';
import { ImportIngredient } from '../../import_ingredient/entities/import_ingredient.entity';
import { RecipeIngredient } from '../../recipe_ingredient/entities/recipe_ingredient.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unitName: string;

  @Column()
  image: string;

  @Column()
  isActive: number;

  @Column()
  quantity: number;

  @OneToMany(() => RecipeIngredient, (item) => item.ingredient)
  recipe_ingredients: RecipeIngredient[];

  @OneToMany(() => ImportIngredient, (item) => item.ingredient)
  import_ingredients: RecipeIngredient[];

  @OneToMany(() => ExportIngredient, (item) => item.ingredient)
  export_ingredients: ExportIngredient[];
}
