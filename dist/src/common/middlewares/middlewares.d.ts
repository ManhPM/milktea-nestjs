import { ExportService } from '../../export/export.service';
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../auth/auth.service';
import { ImportService } from '../../import/import.service';
import { IngredientService } from '../../ingredient/ingredient.service';
import { InvoiceService } from '../../invoice/invoice.service';
import { ProductService } from '../../product/product.service';
import { RecipeService } from '../../recipe/recipe.service';
import { ReviewService } from '../../review/review.service';
import { ShippingCompanyService } from '../../shipping_company/shipping_company.service';
import { StaffService } from '../../staff/staff.service';
import { TypeService } from '../../type/type.service';
import { MessageService } from '../lib';
export declare class CheckExistPhone implements NestMiddleware {
    private authService;
    private readonly messageService;
    constructor(authService: AuthService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckExistProduct implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: ProductService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckExistExport implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: ExportService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckExistImport implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: ImportService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckExistIngredient implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: IngredientService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckExistInvoice implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: InvoiceService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckExistRecipe implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: RecipeService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckExistShippingCompany implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: ShippingCompanyService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckExistStaff implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: StaffService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckExistType implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: TypeService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckCreateIngredient implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: IngredientService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckCreateReview implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: ReviewService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckCreateShippingCompany implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: ShippingCompanyService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class CheckCreateType implements NestMiddleware {
    private service;
    private readonly messageService;
    constructor(service: TypeService, messageService: MessageService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
