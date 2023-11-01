import { ExportService } from '../../export/export.service';
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../auth/auth.service';
import { ImportService } from '../../import/import.service';
import { IngredientService } from '../../ingredient/ingredient.service';
import { InvoiceService } from '../../invoice/invoice.service';
import { ShippingCompanyService } from '../../shipping_company/shipping_company.service';
import { StaffService } from '../../staff/staff.service';
import { TypeService } from '../../type/type.service';
import { ProductService } from '../../product/product.service';
import { MessageService } from '../lib';
export declare class validateLogin implements NestMiddleware {
    private readonly messageService;
    constructor(messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateRegister implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: AuthService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateUpdateUser implements NestMiddleware {
    private readonly messageService;
    constructor(messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateChangePassword implements NestMiddleware {
    private readonly messageService;
    constructor(messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateForgotPassword implements NestMiddleware {
    private readonly messageService;
    constructor(messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCreateCartProduct implements NestMiddleware {
    private readonly messageService;
    constructor(messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateUpdateCartProduct implements NestMiddleware {
    private readonly messageService;
    constructor(messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCreateImportIngredient implements NestMiddleware {
    private service1;
    private service2;
    private readonly messageService;
    constructor(service1: ImportService, service2: IngredientService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateDeleteImportIngredient implements NestMiddleware {
    private service1;
    private service2;
    private readonly messageService;
    constructor(service1: ImportService, service2: IngredientService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCreateExportIngredient implements NestMiddleware {
    private service1;
    private service2;
    private readonly messageService;
    constructor(service1: ExportService, service2: IngredientService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateDeleteExportIngredient implements NestMiddleware {
    private service1;
    private service2;
    private readonly messageService;
    constructor(service1: ExportService, service2: IngredientService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCreateIngredient implements NestMiddleware {
    private readonly messageService;
    constructor(messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCheckOut implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: ShippingCompanyService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCheckOut1 implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: ShippingCompanyService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateFromDateToDate implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: ShippingCompanyService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCreateRecipe implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: TypeService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateUpdateRecipe implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: TypeService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCreateReview implements NestMiddleware {
    private service1;
    private service2;
    private readonly messageService;
    constructor(service1: InvoiceService, service2: ProductService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCreateShippingCompany implements NestMiddleware {
    private readonly messageService;
    constructor(messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateUpdateShippingCompany implements NestMiddleware {
    private readonly messageService;
    constructor(messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateUpdateShop implements NestMiddleware {
    private readonly messageService;
    constructor(messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCreateStaff implements NestMiddleware {
    private service1;
    private service2;
    private readonly messageService;
    constructor(service1: AuthService, service2: StaffService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateUpdateStaff implements NestMiddleware {
    private service1;
    private service2;
    private readonly messageService;
    constructor(service1: AuthService, service2: StaffService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class validateCompleteImportExport implements NestMiddleware {
    private service1;
    private service2;
    private readonly messageService;
    constructor(service1: ImportService, service2: ExportService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
