"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckCreateType = exports.CheckCreateShippingCompany = exports.CheckCreateReview = exports.CheckCreateIngredient = exports.CheckExistType = exports.CheckExistStaff = exports.CheckExistShippingCompany = exports.CheckExistRecipe = exports.CheckExistInvoice = exports.CheckExistIngredient = exports.CheckExistImport = exports.CheckExistExport = exports.CheckExistProduct = exports.CheckExistPhone = void 0;
const export_service_1 = require("../../export/export.service");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../auth/auth.service");
const import_service_1 = require("../../import/import.service");
const ingredient_service_1 = require("../../ingredient/ingredient.service");
const invoice_service_1 = require("../../invoice/invoice.service");
const product_service_1 = require("../../product/product.service");
const recipe_service_1 = require("../../recipe/recipe.service");
const review_service_1 = require("../../review/review.service");
const shipping_company_service_1 = require("../../shipping_company/shipping_company.service");
const staff_service_1 = require("../../staff/staff.service");
const type_service_1 = require("../../type/type.service");
const lib_1 = require("../lib");
let CheckExistPhone = class CheckExistPhone {
    constructor(authService, messageService) {
        this.authService = authService;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const phoneNumber = req.body.phone;
            const exists = await this.authService.checkExistPhone(phoneNumber);
            if (!exists) {
                throw new common_1.HttpException({
                    messageCode: 'PHONE_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckExistPhone = CheckExistPhone;
exports.CheckExistPhone = CheckExistPhone = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        lib_1.MessageService])
], CheckExistPhone);
let CheckExistProduct = class CheckExistProduct {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const id = req.params.id;
            const exists = await this.service.checkExist(+id);
            if (!exists) {
                throw new common_1.HttpException({
                    messageCode: 'PRODUCT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckExistProduct = CheckExistProduct;
exports.CheckExistProduct = CheckExistProduct = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        lib_1.MessageService])
], CheckExistProduct);
let CheckExistExport = class CheckExistExport {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const id = req.params.id;
            const exists = await this.service.checkExist(+id);
            if (!exists) {
                throw new common_1.HttpException({
                    messageCode: 'EXPORT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckExistExport = CheckExistExport;
exports.CheckExistExport = CheckExistExport = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [export_service_1.ExportService,
        lib_1.MessageService])
], CheckExistExport);
let CheckExistImport = class CheckExistImport {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const id = req.params.id;
            const exists = await this.service.checkExist(+id);
            if (!exists) {
                throw new common_1.HttpException({
                    messageCode: 'IMPORT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            console.log(error);
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckExistImport = CheckExistImport;
exports.CheckExistImport = CheckExistImport = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [import_service_1.ImportService,
        lib_1.MessageService])
], CheckExistImport);
let CheckExistIngredient = class CheckExistIngredient {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const id = req.params.id;
            const exists = await this.service.checkExist(+id);
            if (!exists) {
                throw new common_1.HttpException({
                    messageCode: 'INGREDIENT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckExistIngredient = CheckExistIngredient;
exports.CheckExistIngredient = CheckExistIngredient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ingredient_service_1.IngredientService,
        lib_1.MessageService])
], CheckExistIngredient);
let CheckExistInvoice = class CheckExistInvoice {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const id = req.params.id;
            const exists = await this.service.checkExist(+id);
            if (!exists) {
                throw new common_1.HttpException({
                    messageCode: 'INVOICE_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckExistInvoice = CheckExistInvoice;
exports.CheckExistInvoice = CheckExistInvoice = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService,
        lib_1.MessageService])
], CheckExistInvoice);
let CheckExistRecipe = class CheckExistRecipe {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const id = req.params.id;
            const exists = await this.service.checkExist(+id);
            if (!exists) {
                throw new common_1.HttpException({
                    messageCode: 'RECIPE_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckExistRecipe = CheckExistRecipe;
exports.CheckExistRecipe = CheckExistRecipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService,
        lib_1.MessageService])
], CheckExistRecipe);
let CheckExistShippingCompany = class CheckExistShippingCompany {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const id = req.params.id;
            const exists = await this.service.checkExist(+id);
            if (!exists) {
                throw new common_1.HttpException({
                    messageCode: 'SHIPPING_COMPANY_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckExistShippingCompany = CheckExistShippingCompany;
exports.CheckExistShippingCompany = CheckExistShippingCompany = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shipping_company_service_1.ShippingCompanyService,
        lib_1.MessageService])
], CheckExistShippingCompany);
let CheckExistStaff = class CheckExistStaff {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const id = req.params.id;
            const exists = await this.service.checkExist(+id);
            if (!exists) {
                throw new common_1.HttpException({
                    messageCode: 'STAFF_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckExistStaff = CheckExistStaff;
exports.CheckExistStaff = CheckExistStaff = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [staff_service_1.StaffService,
        lib_1.MessageService])
], CheckExistStaff);
let CheckExistType = class CheckExistType {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const id = req.params.id;
            const exists = await this.service.checkExist(+id);
            if (!exists) {
                throw new common_1.HttpException({
                    messageCode: 'TYPE_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckExistType = CheckExistType;
exports.CheckExistType = CheckExistType = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_service_1.TypeService,
        lib_1.MessageService])
], CheckExistType);
let CheckCreateIngredient = class CheckCreateIngredient {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const name = req.body.name;
            const unitName = req.body.unitName;
            const exists = await this.service.checkCreate(name, unitName);
            console.log(exists);
            if (exists) {
                throw new common_1.HttpException({
                    messageCode: 'INGREDIENT_ISEXIST_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckCreateIngredient = CheckCreateIngredient;
exports.CheckCreateIngredient = CheckCreateIngredient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ingredient_service_1.IngredientService,
        lib_1.MessageService])
], CheckCreateIngredient);
let CheckCreateReview = class CheckCreateReview {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        const id = req.body.productId;
        const id_order = req.body.invoiceId;
        await this.service.checkCreate(+id_order, +id);
        next();
    }
};
exports.CheckCreateReview = CheckCreateReview;
exports.CheckCreateReview = CheckCreateReview = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_service_1.ReviewService,
        lib_1.MessageService])
], CheckCreateReview);
let CheckCreateShippingCompany = class CheckCreateShippingCompany {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const name = req.body.name;
            const costPerKm = req.body.costPerKm;
            const exists = await this.service.checkCreate(name, costPerKm);
            if (exists) {
                throw new common_1.HttpException({
                    messageCode: 'SHIPPING_COMPANY_ISEXIST_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckCreateShippingCompany = CheckCreateShippingCompany;
exports.CheckCreateShippingCompany = CheckCreateShippingCompany = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shipping_company_service_1.ShippingCompanyService,
        lib_1.MessageService])
], CheckCreateShippingCompany);
let CheckCreateType = class CheckCreateType {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const name = req.body.name;
            if (name) {
                throw new common_1.HttpException({
                    messageCodeCode: 'INPUT_TYPE_NAME_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const exists = await this.service.checkCreate(name);
            if (exists) {
                throw new common_1.HttpException({
                    messageCodeCode: 'TYPE_ISEXIST_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.CheckCreateType = CheckCreateType;
exports.CheckCreateType = CheckCreateType = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_service_1.TypeService,
        lib_1.MessageService])
], CheckCreateType);
//# sourceMappingURL=middlewares.js.map