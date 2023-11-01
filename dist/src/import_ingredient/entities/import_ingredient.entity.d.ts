import { Import } from '../../import/entities/import.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';
export declare class ImportIngredient {
    id: number;
    quantity: number;
    price: number;
    import: Import;
    ingredient: Ingredient;
}
