import { Recipe } from '../../recipe/entities/recipe.entity';
import { RecipeType } from '../../recipe_type/entities/recipe_type.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => RecipeType, (item) => item.type)
  recipe_types: RecipeType[];

  @OneToMany(() => Recipe, (item) => item.type)
  recipes: Recipe[];
}
