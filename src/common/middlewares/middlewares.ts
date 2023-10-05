import { ExportService } from './../../export/export.service';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CartProductService } from 'src/cart_product/cart_product.service';
import { ImportService } from 'src/import/import.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { RecipeService } from 'src/recipe/recipe.service';
import { ReviewService } from 'src/review/review.service';
import { ShippingCompanyService } from 'src/shipping_company/shipping_company.service';
import { ShopService } from 'src/shop/shop.service';
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
          message: 'Số điện thoại không tồn tại',
        },
        400,
      );
    }
    next();
  }
}

@Injectable()
export class CheckExistProduct implements NestMiddleware {
  constructor(private service: CartProductService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exists = await this.service.checkExist(+id);

    if (!exists) {
      throw new HttpException(
        {
          message: 'Sản phẩm không tồn tại',
        },
        400,
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
          message: 'Mã hoá đơn xuất không tồn tại',
        },
        400,
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
          message: 'Mã hoá đơn nhập không tồn tại',
        },
        400,
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
          message: 'Mã nguyên liệu không tồn tại',
        },
        400,
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
          message: 'Mã hoá đơn không tồn tại',
        },
        400,
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
          message: 'Mã công thức không tồn tại',
        },
        400,
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
          message: 'Mã đơn vị vận chuyển không tồn tại',
        },
        400,
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
          message: 'Mã nhân viên không tồn tại',
        },
        400,
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
          message: 'Mã loại hàng không tồn tại',
        },
        400,
      );
    }
    next();
  }
}

@Injectable()
export class CheckRegisterPhone implements NestMiddleware {
  constructor(private service: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const phone = req.body.phone;
    const exists = await this.service.checkExistPhone(phone);

    if (exists) {
      throw new HttpException(
        {
          message: 'Số điện thoại đã tồn tại',
        },
        400,
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
          message: 'Bạn đang tồn tại hoá đơn xuất chưa hoàn thành',
        },
        400,
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
          message: 'Bạn đang tồn tại hoá đơn nhập chưa hoàn thành',
        },
        400,
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
          message: 'Nguyên liệu đã tồn tại',
        },
        400,
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
          message: 'Đơn vị vận chuyển đã tồn tại',
        },
        400,
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
    const exists = await this.service.checkCreate(name);

    if (exists) {
      throw new HttpException(
        {
          message: 'Loại hàng đã tồn tại',
        },
        400,
      );
    }
    next();
  }
}
