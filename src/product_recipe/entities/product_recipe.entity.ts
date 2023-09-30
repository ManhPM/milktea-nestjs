import { Product } from 'src/product/entities/product.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductRecipe {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe, (invoice) => invoice.product_recipes)
  recipe: Recipe;

  @ManyToOne(() => Product, (product) => product.product_recipes)
  product: Product;
}
