import { ExportService } from './../../export/export.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { ImportService } from 'src/import/import.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { ProductService } from 'src/product/product.service';
import { RecipeService } from 'src/recipe/recipe.service';
import { ReviewService } from 'src/review/review.service';
import { ShippingCompanyService } from 'src/shipping_company/shipping_company.service';
import { StaffService } from 'src/staff/staff.service';
import { TypeService } from 'src/type/type.service';
import { MessageService } from '../lib';

@Injectable()
export class CheckExistPhone implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const phoneNumber = req.body.phone;
      const exists = await this.authService.checkExistPhone(phoneNumber);
      if (!exists) {
        throw new HttpException(
          {
            messageCode: 'PHONE_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckExistProduct implements NestMiddleware {
  constructor(
    private service: ProductService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const exists = await this.service.checkExist(+id);

      if (!exists) {
        throw new HttpException(
          {
            messageCode: 'PRODUCT_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckExistExport implements NestMiddleware {
  constructor(
    private service: ExportService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const exists = await this.service.checkExist(+id);

      if (!exists) {
        throw new HttpException(
          {
            messageCode: 'EXPORT_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckExistImport implements NestMiddleware {
  constructor(
    private service: ImportService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const exists = await this.service.checkExist(+id);

      if (!exists) {
        throw new HttpException(
          {
            messageCode: 'IMPORT_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckExistIngredient implements NestMiddleware {
  constructor(
    private service: IngredientService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const exists = await this.service.checkExist(+id);

      if (!exists) {
        throw new HttpException(
          {
            messageCode: 'INGREDIENT_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckExistInvoice implements NestMiddleware {
  constructor(
    private service: InvoiceService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const exists = await this.service.checkExist(+id);

      if (!exists) {
        throw new HttpException(
          {
            messageCode: 'INVOICE_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckExistRecipe implements NestMiddleware {
  constructor(
    private service: RecipeService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const exists = await this.service.checkExist(+id);

      if (!exists) {
        throw new HttpException(
          {
            messageCode: 'RECIPE_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckExistShippingCompany implements NestMiddleware {
  constructor(
    private service: ShippingCompanyService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const exists = await this.service.checkExist(+id);

      if (!exists) {
        throw new HttpException(
          {
            messageCode: 'SHIPPING_COMPANY_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckExistStaff implements NestMiddleware {
  constructor(
    private service: StaffService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const exists = await this.service.checkExist(+id);

      if (!exists) {
        throw new HttpException(
          {
            messageCode: 'STAFF_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckExistType implements NestMiddleware {
  constructor(
    private service: TypeService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const exists = await this.service.checkExist(+id);

      if (!exists) {
        throw new HttpException(
          {
            messageCode: 'TYPE_NOTFOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckCreateExport implements NestMiddleware {
  constructor(
    private service: ExportService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const exists = await this.service.checkCreate(req);
      if (exists) {
        throw new HttpException(
          {
            messageCode: 'EXPORT_ISEXIST_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckCreateImport implements NestMiddleware {
  constructor(
    private service: ImportService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const exists = await this.service.checkCreate(req);

      if (exists) {
        throw new HttpException(
          {
            messageCode: 'IMPORT_ISEXIST_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckCreateIngredient implements NestMiddleware {
  constructor(
    private service: IngredientService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.body.name;
      const unitName = req.body.unitName;
      const exists = await this.service.checkCreate(name, unitName);

      if (exists) {
        throw new HttpException(
          {
            messageCode: 'INGREDIENT_ISEXIST_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckCreateReview implements NestMiddleware {
  constructor(
    private service: ReviewService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.body.productId;
    const id_order = req.body.invoiceId;
    await this.service.checkCreate(+id_order, +id);
    next();
  }
}

@Injectable()
export class CheckCreateShippingCompany implements NestMiddleware {
  constructor(
    private service: ShippingCompanyService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.body.name;
      const costPerKm = req.body.costPerKm;
      const exists = await this.service.checkCreate(name, costPerKm);

      if (exists) {
        throw new HttpException(
          {
            messageCode: 'SHIPPING_COMPANY_ISEXIST_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

@Injectable()
export class CheckCreateType implements NestMiddleware {
  constructor(
    private service: TypeService,
    private readonly messageService: MessageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.body.name;
      if (name) {
        throw new HttpException(
          {
            messageCodeCode: 'INPUT_TYPE_NAME_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const exists = await this.service.checkCreate(name);

      if (exists) {
        throw new HttpException(
          {
            messageCodeCode: 'TYPE_ISEXIST_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      next();
    } catch (error) {
      let message;
      if (error.response.messageCode) {
        message = await this.messageService.getMessage(
          error.response.messageCode,
        );
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
        throw new HttpException(
          {
            message: message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
