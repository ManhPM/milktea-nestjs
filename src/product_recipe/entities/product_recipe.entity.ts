import { Product } from '../../product/entities/product.entity';
import { Recipe } from '../../recipe/entities/recipe.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductRecipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isMain: number;

  @ManyToOne(() => Recipe, (invoice) => invoice.product_recipes)
  recipe: Recipe;

  @ManyToOne(() => Product, (product) => product.product_recipes)
  product: Product;
}
