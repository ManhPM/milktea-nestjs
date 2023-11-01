import { Account } from '../../account/entities/account.entity';
import { Export } from '../../export/entities/export.entity';
import { Import } from '../../import/entities/import.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
export declare class Staff {
    id: number;
    name: string;
    isActive: number;
    account: Account;
    imports: Import[];
    exports: Export[];
    invoices: Invoice[];
}
