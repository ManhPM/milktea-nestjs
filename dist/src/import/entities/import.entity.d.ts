import { ImportIngredient } from '../../import_ingredient/entities/import_ingredient.entity';
import { Staff } from '../../staff/entities/staff.entity';
export declare class Import {
    id: number;
    date: Date;
    isCompleted: number;
    total: number;
    description: string;
    staff: Staff;
    import_ingredients: ImportIngredient[];
}
