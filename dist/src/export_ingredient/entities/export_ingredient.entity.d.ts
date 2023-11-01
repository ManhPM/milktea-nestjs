import { Export } from '../../export/entities/export.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';
export declare class ExportIngredient {
    id: number;
    quantity: number;
    price: number;
    export: Export;
    ingredient: Ingredient;
}
