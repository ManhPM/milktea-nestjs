import { ExportIngredient } from '../../export_ingredient/entities/export_ingredient.entity';
import { Staff } from '../../staff/entities/staff.entity';
export declare class Export {
    id: number;
    date: Date;
    isCompleted: number;
    total: number;
    description: string;
    staff: Staff;
    export_ingredients: ExportIngredient[];
}
