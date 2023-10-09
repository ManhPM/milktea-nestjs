import { ExportService } from './../../export/export.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CartProductService } from 'src/cart_product/cart_product.service';
import { ImportService } from 'src/import/import.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { ProductService } from 'src/product/product.service';
import { RecipeService } from 'src/recipe/recipe.service';
import { ReviewService } from 'src/review/review.service';
import { ShippingCompanyService } from 'src/shipping_company/shipping_company.service';
import { StaffService } from 'src/staff/staff.service';
import { TypeService } from 'src/type/type.service';

@Injectable()
export class CheckExistPhone implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const phoneNumber = req.body.phone;
    const exists = await this.authService.checkExistPhone(phoneNumber);

    if (!exists) {
      throw new HttpException(
        {
          message: 'PHONE_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckExistProduct implements NestMiddleware {
  constructor(private service: ProductService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exists = await this.service.checkExist(+id);

    if (!exists) {
      throw new HttpException(
        {
          message: 'PRODUCT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckExistExport implements NestMiddleware {
  constructor(private service: ExportService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exists = await this.service.checkExist(+id);

    if (!exists) {
      throw new HttpException(
        {
          message: 'EXPORT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckExistImport implements NestMiddleware {
  constructor(private service: ImportService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exists = await this.service.checkExist(+id);

    if (!exists) {
      throw new HttpException(
        {
          message: 'IMPORT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckExistIngredient implements NestMiddleware {
  constructor(private service: IngredientService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exists = await this.service.checkExist(+id);

    if (!exists) {
      throw new HttpException(
        {
          message: 'INGREDIENT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckExistInvoice implements NestMiddleware {
  constructor(private service: InvoiceService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exists = await this.service.checkExist(+id);

    if (!exists) {
      throw new HttpException(
        {
          message: 'INVOICE_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckExistRecipe implements NestMiddleware {
  constructor(private service: RecipeService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exists = await this.service.checkExist(+id);

    if (!exists) {
      throw new HttpException(
        {
          message: 'RECIPE_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckExistShippingCompany implements NestMiddleware {
  constructor(private service: ShippingCompanyService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exists = await this.service.checkExist(+id);

    if (!exists) {
      throw new HttpException(
        {
          message: 'SHIPPING_COMPANY_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckExistStaff implements NestMiddleware {
  constructor(private service: StaffService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exists = await this.service.checkExist(+id);

    if (!exists) {
      throw new HttpException(
        {
          message: 'STAFF_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckExistType implements NestMiddleware {
  constructor(private service: TypeService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exists = await this.service.checkExist(+id);

    if (!exists) {
      throw new HttpException(
        {
          message: 'TYPE_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckCreateExport implements NestMiddleware {
  constructor(private service: ExportService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const exists = await this.service.checkCreate(req);

    if (exists) {
      throw new HttpException(
        {
          message: 'EXPORT_ISEXIST_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckCreateImport implements NestMiddleware {
  constructor(private service: ImportService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const exists = await this.service.checkCreate(req);

    if (exists) {
      throw new HttpException(
        {
          message: 'IMPORT_ISEXIST_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckCreateIngredient implements NestMiddleware {
  constructor(private service: IngredientService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const name = req.body.name;
    const unitName = req.body.unitName;
    const exists = await this.service.checkCreate(name, unitName);

    if (exists) {
      throw new HttpException(
        {
          message: 'INGREDIENT_ISEXIST_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckCreateReview implements NestMiddleware {
  constructor(private service: ReviewService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.body.productId;
    const id_order = req.body.invoiceId;
    await this.service.checkCreate(+id_order, +id);
    next();
  }
}

@Injectable()
export class CheckCreateShippingCompany implements NestMiddleware {
  constructor(private service: ShippingCompanyService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const name = req.body.name;
    const costPerKm = req.body.costPerKm;
    const exists = await this.service.checkCreate(name, costPerKm);

    if (exists) {
      throw new HttpException(
        {
          message: 'SHIPPING_COMPANY_ISEXIST_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class CheckCreateType implements NestMiddleware {
  constructor(private service: TypeService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const name = req.body.name;
    if (name) {
      throw new HttpException(
        {
          messageCode: 'INPUT_TYPE_NAME_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const exists = await this.service.checkCreate(name);

    if (exists) {
      throw new HttpException(
        {
          messageCode: 'TYPE_ISEXIST_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}
