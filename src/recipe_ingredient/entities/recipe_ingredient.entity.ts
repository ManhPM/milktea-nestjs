import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipe_ingredients)
  recipe: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipe_ingredients)
  ingredient: Ingredient;
}
