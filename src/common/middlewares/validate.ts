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
import { ShippingCompanyService } from 'src/shipping_company/shipping_company.service';
import { StaffService } from 'src/staff/staff.service';
import { TypeService } from 'src/type/type.service';
import { ProductService } from 'src/product/product.service';
import {
  isBit,
  isNumberic,
  isPositiveNum,
  isValidDate,
  isLatitude,
  isLongitude,
  isLessThan15Years,
  isDateGreaterThanNow,
} from '../lib';

@Injectable()
export class validateLogin implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const phone = req.body.phone;
    const password = req.body.password;
    if (!phone) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!password) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PASSWORD_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (password.length < 6) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PASSWORD_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(phone)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (phone.length != 10) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateRegister implements NestMiddleware {
  constructor(private service: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const phone = req.body.phone;
    const password = req.body.password;
    const name = req.body.name;
    if (!phone) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (password.length < 6) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PASSWORD_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!name) {
      throw new HttpException(
        {
          messageCode: 'INPUT_USERNAME_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!password) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PASSWORD_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(phone)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (phone.length != 10) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const exists = await this.service.checkExistPhone(phone);
    if (exists) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR3',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateUpdateUser implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const phone = req.body.phone;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;
    if (phone) {
      if (phone.length != 10) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PHONE_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (password) {
      if (!repeatPassword) {
        throw new HttpException(
          {
            messageCode: 'INPUT_REPEAT_PASSWORD_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (repeatPassword) {
      if (!password) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PASSWORD_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (password && repeatPassword) {
      if (password.length < 6 || repeatPassword < 6) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PASSWORD_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (password != repeatPassword) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PASSWORD_ERROR3',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (!isNumberic(phone)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (phone.length != 10) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateCreateCartProduct implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const productString = req.body.productString;
    const quantity = req.body.quantity;
    const size = req.body.size;
    if (!productString) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRODUCT_STRING_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!quantity) {
      throw new HttpException(
        {
          messageCode: 'INPUT_QUANTITY_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!size) {
      throw new HttpException(
        {
          messageCode: 'INPUT_SIZE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(quantity)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_QUANTITY_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(size)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_SIZE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isPositiveNum(quantity)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_QUANTITY_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (size < 0) {
      throw new HttpException(
        {
          messageCode: 'INPUT_SIZE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateUpdateCartProduct implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const quantity = req.body.quantity;
    const size = req.body.size;
    if (quantity) {
      if (!isNumberic(quantity)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_QUANTITY_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!isPositiveNum(quantity)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_QUANTITY_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (size) {
      if (!isNumberic(size)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_SIZE_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (size < 0) {
        throw new HttpException(
          {
            messageCode: 'INPUT_SIZE_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    next();
  }
}

@Injectable()
export class validateCreateImportIngredient implements NestMiddleware {
  constructor(
    private service1: ImportService,
    private service2: IngredientService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const importId = req.body.importId;
    const ingredientId = req.body.ingredientId;
    const quantity = req.body.quantity;
    const price = req.body.price;
    if (!price) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRICE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!quantity) {
      throw new HttpException(
        {
          messageCode: 'INPUT_QUANTITY_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!importId) {
      throw new HttpException(
        {
          messageCode: 'INPUT_IMPORT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!ingredientId) {
      throw new HttpException(
        {
          messageCode: 'INPUT_INGREDIENT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(price)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRICE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(quantity)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_QUANTITY_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isPositiveNum(price)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRICE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isPositiveNum(quantity)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_QUANTITY_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const ingredient = await this.service1.checkExist(ingredientId);
    const checkImport = await this.service2.checkExist(importId);
    if (!ingredient) {
      throw new HttpException(
        {
          messageCode: 'INGREDIENT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!checkImport) {
      throw new HttpException(
        {
          messageCode: 'IMPORT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (checkImport.isCompleted != 0) {
      throw new HttpException(
        {
          messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateDeleteImportIngredient implements NestMiddleware {
  constructor(
    private service1: ImportService,
    private service2: IngredientService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const importId = req.body.importId;
    const ingredientId = req.body.ingredientId;
    const ingredient = await this.service1.checkExist(ingredientId);
    const checkImport = await this.service2.checkExist(importId);
    if (!ingredient) {
      throw new HttpException(
        {
          messageCode: 'INGREDIENT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!checkImport) {
      throw new HttpException(
        {
          messageCode: 'IMPORT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (checkImport.isCompleted != 0) {
      throw new HttpException(
        {
          messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateCreateExportIngredient implements NestMiddleware {
  constructor(
    private service1: ExportService,
    private service2: IngredientService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const exportId = req.body.exportId;
    const ingredientId = req.body.ingredientId;
    const quantity = req.body.quantity;
    const price = req.body.price;
    if (!price) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRICE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!quantity) {
      throw new HttpException(
        {
          messageCode: 'INPUT_QUANTITY_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!exportId) {
      throw new HttpException(
        {
          messageCode: 'INPUT_EXPORT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!ingredientId) {
      throw new HttpException(
        {
          messageCode: 'INGREDIENT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(price)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRICE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(quantity)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_QUANTITY_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isPositiveNum(price)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRICE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isPositiveNum(quantity)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_QUANTITY_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const ingredient = await this.service1.checkExist(ingredientId);
    const checkExport = await this.service2.checkExist(exportId);

    if (!ingredient) {
      throw new HttpException(
        {
          messageCode: 'INGREDIENT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!checkExport) {
      throw new HttpException(
        {
          messageCode: 'EXPORT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (checkExport.isCompleted != 0) {
      throw new HttpException(
        {
          messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateDeleteExportIngredient implements NestMiddleware {
  constructor(
    private service1: ExportService,
    private service2: IngredientService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const exportId = req.body.exportId;
    const ingredientId = req.body.ingredientId;
    const ingredient = await this.service1.checkExist(ingredientId);
    const checkExport = await this.service2.checkExist(exportId);
    if (!exportId) {
      throw new HttpException(
        {
          messageCode: 'INPUT_EXPORT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!ingredientId) {
      throw new HttpException(
        {
          messageCode: 'INPUT_INGREDIENT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!ingredient) {
      throw new HttpException(
        {
          messageCode: 'INGREDIENT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!checkExport) {
      throw new HttpException(
        {
          messageCode: 'EXPORT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (checkExport.isCompleted != 0) {
      throw new HttpException(
        {
          messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateCreateIngredient implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const name = req.body.name;
    const unitName = req.body.unitName;
    const image = req.body.image;
    if (!name) {
      throw new HttpException(
        {
          messageCode: 'INPUT_NAME_INGREDIENT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!unitName) {
      throw new HttpException(
        {
          messageCode: 'INPUT_UNITNAME_INGREDIENT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!image) {
      throw new HttpException(
        {
          messageCode: 'INPUT_IMAGE_INGREDIENT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateCheckOut implements NestMiddleware {
  constructor(private service: ShippingCompanyService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const shippingFee = req.body.shippingFee;
    const shippingCompanyId = req.body.shippingCompanyId;
    const paymentMethod = req.body.paymentMethod;
    if (!shippingFee) {
      throw new HttpException(
        {
          messageCode: 'INPUT_SHIPPINGFEE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!shippingCompanyId) {
      throw new HttpException(
        {
          messageCode: 'INPUT_SHIPPINGFEE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!paymentMethod) {
      throw new HttpException(
        {
          messageCode: 'INPUT_IMAGE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(shippingFee)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_SHIPPINGFEE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (shippingFee < 0) {
      throw new HttpException(
        {
          messageCode: 'INPUT_SHIPPINGFEE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const checkShippingCompany =
      await this.service.checkExist(shippingCompanyId);
    if (!checkShippingCompany) {
      throw new HttpException(
        {
          messageCode: 'SHIPPING_COMPANY_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateStatistical implements NestMiddleware {
  constructor(private service: ShippingCompanyService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    if (!fromDate) {
      throw new HttpException(
        {
          messageCode: 'INPUT_FROMDATE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!toDate) {
      throw new HttpException(
        {
          messageCode: 'INPUT_TODATE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isValidDate(fromDate)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_FROMDATE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isValidDate(toDate)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_TODATE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isDateGreaterThanNow(fromDate)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_FROMDATE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isDateGreaterThanNow(toDate)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_TODATE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateCreateRecipe implements NestMiddleware {
  constructor(private service: TypeService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const name = req.body.name;
    const price = req.body.price;
    const typeId = req.body.typeId;
    if (!name) {
      throw new HttpException(
        {
          messageCode: 'INPUT_NAME_RECIPE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!typeId) {
      throw new HttpException(
        {
          messageCode: 'INPUT_TYPE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!price) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRICE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(price)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRICE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isPositiveNum(price)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRICE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const checkType = await this.service.checkExist(typeId);
    if (!checkType) {
      throw new HttpException(
        {
          messageCode: 'TYPE_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateUpdateRecipe implements NestMiddleware {
  constructor(private service: TypeService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const discount = req.body.discount;
    const price = req.body.price;
    if (discount) {
      if (!isNumberic(discount)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_DISCOUNT_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (discount < 0 || discount > 100) {
        throw new HttpException(
          {
            messageCode: 'INPUT_DISCOUNT_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (price) {
      if (!isNumberic(price)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PRICE_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!isPositiveNum(price)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PRICE_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    next();
  }
}

@Injectable()
export class validateCreateReview implements NestMiddleware {
  constructor(
    private service1: InvoiceService,
    private service2: ProductService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const rating = req.body.rating;
    const invoiceId = req.body.invoiceId;
    const productId = req.body.productId;
    if (!rating) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAR_RATING_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(rating)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAR_RATING_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (rating < 1 || rating > 5) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAR_RATING_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!invoiceId) {
      throw new HttpException(
        {
          messageCode: 'INPUT_INVOICE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!productId) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PRODUCT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const checkInvoice = await this.service1.checkExist(invoiceId);
    const checkProduct = await this.service2.checkExist(productId);
    if (!checkInvoice) {
      throw new HttpException(
        {
          messageCode: 'INVOICE_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!checkProduct) {
      throw new HttpException(
        {
          messageCode: 'PRODUCT_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateCreateShippingCompany implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const costPerKm = req.body.costPerKm;
    if (!costPerKm) {
      throw new HttpException(
        {
          messageCode: 'INPUT_COSTPERKM_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(costPerKm)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_COSTPERKM_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (costPerKm <= 0) {
      throw new HttpException(
        {
          messageCode: 'INPUT_COSTPERKM_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateUpdateShippingCompany implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const costPerKm = req.body.costPerKm;
    if (costPerKm) {
      if (!isNumberic(costPerKm)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_COSTPERKM_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (costPerKm <= 0) {
        throw new HttpException(
          {
            messageCode: 'INPUT_COSTPERKM_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    next();
  }
}

@Injectable()
export class validateUpdateShop implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const upSizePrice = req.body.upSizePrice;
    const isActive = req.body.isActive;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    if (upSizePrice) {
      if (!isNumberic(upSizePrice)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_UPSIZE_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (upSizePrice <= 0) {
        throw new HttpException(
          {
            messageCode: 'INPUT_UPSIZE_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (isActive) {
      if (!isNumberic(isActive)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_STATUS_SHOP_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!isBit(isActive)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_STATUS_SHOP_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (latitude) {
      if (!isLatitude(latitude)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_LATITUDE_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (longitude) {
      if (!isLongitude(longitude)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_LONGITUDE_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    next();
  }
}

@Injectable()
export class validateCreateStaff implements NestMiddleware {
  constructor(
    private service1: AuthService,
    private service2: StaffService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const hiredate = req.body.hiredate;
    const role = req.body.role;
    if (!name) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_NAME_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!address) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_ADDRESS_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!gender) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_GENDER_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (gender !== 'Mam' && gender !== 'Nữ') {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_GENDER_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!role) {
      throw new HttpException(
        {
          messageCode: 'INPUT_ROLE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(role)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_ROLE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!birthday) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_BIRTHDAY_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!hiredate) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_HIREDATE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isValidDate(birthday)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_BIRTHDAY_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isValidDate(hiredate)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_HIREDATE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isDateGreaterThanNow(birthday)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_BIRTHDAY_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isDateGreaterThanNow(hiredate)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_HIREDATE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isLessThan15Years(birthday, hiredate)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_STAFF_HIREDATE_ERROR3',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!password) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PASSWORD_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (password.length < 6) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PASSWORD_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!phone) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!isNumberic(phone)) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR1',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (phone.lengh != 10) {
      throw new HttpException(
        {
          messageCode: 'INPUT_PHONE_ERROR2',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const checkPhone = await this.service1.checkExistPhone(phone);
    if (checkPhone) {
      throw new HttpException(
        {
          messageCode: 'PHONE_ISEXIST_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

@Injectable()
export class validateUpdateStaff implements NestMiddleware {
  constructor(
    private service1: AuthService,
    private service2: StaffService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const phone = req.body.phone;
    const password = req.body.password;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const hiredate = req.body.hiredate;
    const role = req.body.role;
    if (gender) {
      if (gender !== 'Mam' && gender !== 'Nữ') {
        throw new HttpException(
          {
            messageCode: 'INPUT_STAFF_GENDER_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (role) {
      if (!isNumberic(role)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_ROLE_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (birthday) {
      if (isValidDate(birthday)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_STAFF_BIRTHDAY_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (isDateGreaterThanNow(birthday)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_STAFF_BIRTHDAY_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (hiredate) {
      if (isValidDate(hiredate)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_STAFF_HIREDATE_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (isDateGreaterThanNow(hiredate)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_STAFF_HIREDATE_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (birthday && hiredate) {
      if (isLessThan15Years(birthday, hiredate)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_STAFF_HIREDATE_ERROR3',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (password) {
      if (password.length < 6) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PASSWORD_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (phone) {
      if (!isNumberic(phone)) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PHONE_ERROR1',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (phone.lengh != 10) {
        throw new HttpException(
          {
            messageCode: 'INPUT_PHONE_ERROR2',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const checkPhone = await this.service1.checkExistPhone(phone);
      if (checkPhone) {
        throw new HttpException(
          {
            messageCode: 'PHONE_ISEXIST_ERROR',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    next();
  }
}

@Injectable()
export class validateCompleteImportExport implements NestMiddleware {
  constructor(
    private service1: ImportService,
    private service2: ExportService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const checkImport = await this.service1.findOne(+id);
    const checkExport = await this.service2.findOne(+id);
    if (checkImport.isCompleted != 0 || checkExport.isCompleted != 0) {
      throw new HttpException(
        {
          messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}
