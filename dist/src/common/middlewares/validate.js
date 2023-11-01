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
exports.validateCompleteImportExport = exports.validateUpdateStaff = exports.validateCreateStaff = exports.validateUpdateShop = exports.validateUpdateShippingCompany = exports.validateCreateShippingCompany = exports.validateCreateReview = exports.validateUpdateRecipe = exports.validateCreateRecipe = exports.validateFromDateToDate = exports.validateCheckOut1 = exports.validateCheckOut = exports.validateCreateIngredient = exports.validateDeleteExportIngredient = exports.validateCreateExportIngredient = exports.validateDeleteImportIngredient = exports.validateCreateImportIngredient = exports.validateUpdateCartProduct = exports.validateCreateCartProduct = exports.validateForgotPassword = exports.validateChangePassword = exports.validateUpdateUser = exports.validateRegister = exports.validateLogin = void 0;
const export_service_1 = require("../../export/export.service");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../auth/auth.service");
const import_service_1 = require("../../import/import.service");
const ingredient_service_1 = require("../../ingredient/ingredient.service");
const invoice_service_1 = require("../../invoice/invoice.service");
const shipping_company_service_1 = require("../../shipping_company/shipping_company.service");
const staff_service_1 = require("../../staff/staff.service");
const type_service_1 = require("../../type/type.service");
const product_service_1 = require("../../product/product.service");
const lib_1 = require("../lib");
const lib_2 = require("../lib");
let validateLogin = class validateLogin {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const phone = req.body.phone;
            const password = req.body.password;
            if (!phone) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!password) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (password.length < 6) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(phone)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (phone.length != 10) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR2',
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
exports.validateLogin = validateLogin;
exports.validateLogin = validateLogin = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_2.MessageService])
], validateLogin);
let validateRegister = class validateRegister {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const phone = req.body.phone;
            const password = req.body.password;
            const repeatPassword = req.body.repeatPassword;
            const name = req.body.name;
            if (!phone) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!password) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (password.length < 6) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!repeatPassword) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (repeatPassword.length < 6) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (password != repeatPassword) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR3',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!name) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_USERNAME_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(phone)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (phone.length != 10) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR2',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const exists = await this.service.checkExistPhone(phone);
            if (exists) {
                throw new common_1.HttpException({
                    messageCode: 'PHONE_ISEXIST_ERROR',
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
exports.validateRegister = validateRegister;
exports.validateRegister = validateRegister = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        lib_2.MessageService])
], validateRegister);
let validateUpdateUser = class validateUpdateUser {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const phone = req.body.phone;
            if (phone) {
                if (phone.length != 10) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PHONE_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!(0, lib_1.isNumberic)(phone)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PHONE_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (phone.length != 10) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PHONE_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
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
exports.validateUpdateUser = validateUpdateUser;
exports.validateUpdateUser = validateUpdateUser = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_2.MessageService])
], validateUpdateUser);
let validateChangePassword = class validateChangePassword {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            const repeatPassword = req.body.repeatPassword;
            if (!oldPassword) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR4',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!newPassword) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR6',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!repeatPassword) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_REPEAT_PASSWORD_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (oldPassword.length < 6 ||
                newPassword.length < 6 ||
                repeatPassword.length < 6) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (repeatPassword != newPassword) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR3',
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
exports.validateChangePassword = validateChangePassword;
exports.validateChangePassword = validateChangePassword = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_2.MessageService])
], validateChangePassword);
let validateForgotPassword = class validateForgotPassword {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const newPassword = req.body.newPassword;
            const phone = req.body.phone;
            const repeatPassword = req.body.repeatPassword;
            if (!phone) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (phone.length != 10) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR2',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(phone)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (phone.length != 10) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR2',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!newPassword) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR6',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!repeatPassword) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_REPEAT_PASSWORD_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (newPassword.length < 6 || repeatPassword.length < 6) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (repeatPassword != newPassword) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR3',
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
exports.validateForgotPassword = validateForgotPassword;
exports.validateForgotPassword = validateForgotPassword = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_2.MessageService])
], validateForgotPassword);
let validateCreateCartProduct = class validateCreateCartProduct {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const productString = req.body.productString;
            const quantity = req.body.quantity;
            const size = req.body.size;
            if (!productString) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PRODUCT_STRING_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!quantity) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_QUANTITY_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!size && size != 0) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SIZE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(quantity)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_QUANTITY_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(size)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SIZE_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isPositiveNum)(quantity)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_QUANTITY_ERROR2',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (size < 0) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SIZE_ERROR2',
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
exports.validateCreateCartProduct = validateCreateCartProduct;
exports.validateCreateCartProduct = validateCreateCartProduct = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_2.MessageService])
], validateCreateCartProduct);
let validateUpdateCartProduct = class validateUpdateCartProduct {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const quantity = req.body.quantity;
            const size = req.body.size;
            if (quantity) {
                if (!(0, lib_1.isNumberic)(quantity)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_QUANTITY_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!(0, lib_1.isPositiveNum)(quantity)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_QUANTITY_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (size) {
                if (!(0, lib_1.isNumberic)(size)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_SIZE_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (size < 0) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_SIZE_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
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
exports.validateUpdateCartProduct = validateUpdateCartProduct;
exports.validateUpdateCartProduct = validateUpdateCartProduct = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_2.MessageService])
], validateUpdateCartProduct);
let validateCreateImportIngredient = class validateCreateImportIngredient {
    constructor(service1, service2, messageService) {
        this.service1 = service1;
        this.service2 = service2;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const importId = req.body.importId;
            const ingredientId = req.body.ingredientId.split(',');
            const quantity = req.body.quantity.split(',');
            const price = req.body.price.split(',');
            if (!price) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PRICE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!quantity) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_QUANTITY_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!importId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_IMPORT_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!ingredientId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_INGREDIENT_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            for (let i = 0; i < ingredientId.length; i++) {
                if (!(0, lib_1.isNumberic)(price[i])) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PRICE_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!(0, lib_1.isNumberic)(quantity[i])) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_QUANTITY_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!(0, lib_1.isPositiveNum)(price[i])) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PRICE_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!(0, lib_1.isPositiveNum)(quantity[i])) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_QUANTITY_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                const ingredient = await this.service2.checkExist(ingredientId[i]);
                if (!ingredient) {
                    throw new common_1.HttpException({
                        messageCode: 'INGREDIENT_NOTFOUND',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            const checkImport = await this.service1.checkExist(importId);
            if (!checkImport) {
                throw new common_1.HttpException({
                    messageCode: 'IMPORT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (checkImport.isCompleted != 0) {
                throw new common_1.HttpException({
                    messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
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
exports.validateCreateImportIngredient = validateCreateImportIngredient;
exports.validateCreateImportIngredient = validateCreateImportIngredient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [import_service_1.ImportService,
        ingredient_service_1.IngredientService,
        lib_2.MessageService])
], validateCreateImportIngredient);
let validateDeleteImportIngredient = class validateDeleteImportIngredient {
    constructor(service1, service2, messageService) {
        this.service1 = service1;
        this.service2 = service2;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const importId = req.body.importId;
            const ingredientId = req.body.ingredientId;
            const ingredient = await this.service2.checkExist(ingredientId);
            const checkImport = await this.service1.checkExist(importId);
            if (!ingredient) {
                throw new common_1.HttpException({
                    messageCode: 'INGREDIENT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!checkImport) {
                throw new common_1.HttpException({
                    messageCode: 'IMPORT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (checkImport.isCompleted != 0) {
                throw new common_1.HttpException({
                    messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
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
exports.validateDeleteImportIngredient = validateDeleteImportIngredient;
exports.validateDeleteImportIngredient = validateDeleteImportIngredient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [import_service_1.ImportService,
        ingredient_service_1.IngredientService,
        lib_2.MessageService])
], validateDeleteImportIngredient);
let validateCreateExportIngredient = class validateCreateExportIngredient {
    constructor(service1, service2, messageService) {
        this.service1 = service1;
        this.service2 = service2;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const exportId = req.body.exportId;
            const ingredientId = req.body.ingredientId.split(',');
            const quantity = req.body.quantity.split(',');
            const price = req.body.price.split(',');
            if (!price) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PRICE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!quantity) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_QUANTITY_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!exportId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_EXPORT_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!ingredientId) {
                throw new common_1.HttpException({
                    messageCode: 'INGREDIENT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            for (let i = 0; i < ingredientId.length; i++) {
                if (!(0, lib_1.isNumberic)(price[i])) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PRICE_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!(0, lib_1.isNumberic)(quantity[i])) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_QUANTITY_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!(0, lib_1.isPositiveNum)(price[i])) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PRICE_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!(0, lib_1.isPositiveNum)(quantity[i])) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_QUANTITY_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                const ingredient = await this.service2.checkExist(ingredientId[i]);
                if (!ingredient) {
                    throw new common_1.HttpException({
                        messageCode: 'INGREDIENT_NOTFOUND',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (ingredient.quantity < quantity[i]) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_QUANTITY_ERROR3',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            const checkExport = await this.service1.checkExist(exportId);
            if (!checkExport) {
                throw new common_1.HttpException({
                    messageCode: 'EXPORT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (checkExport.isCompleted != 0) {
                throw new common_1.HttpException({
                    messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
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
exports.validateCreateExportIngredient = validateCreateExportIngredient;
exports.validateCreateExportIngredient = validateCreateExportIngredient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [export_service_1.ExportService,
        ingredient_service_1.IngredientService,
        lib_2.MessageService])
], validateCreateExportIngredient);
let validateDeleteExportIngredient = class validateDeleteExportIngredient {
    constructor(service1, service2, messageService) {
        this.service1 = service1;
        this.service2 = service2;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const exportId = req.body.exportId;
            const ingredientId = req.body.ingredientId;
            const ingredient = await this.service2.checkExist(ingredientId);
            const checkExport = await this.service1.checkExist(exportId);
            if (!exportId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_EXPORT_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!ingredientId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_INGREDIENT_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!ingredient) {
                throw new common_1.HttpException({
                    messageCode: 'INGREDIENT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!checkExport) {
                throw new common_1.HttpException({
                    messageCode: 'EXPORT_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (checkExport.isCompleted != 0) {
                throw new common_1.HttpException({
                    messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
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
exports.validateDeleteExportIngredient = validateDeleteExportIngredient;
exports.validateDeleteExportIngredient = validateDeleteExportIngredient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [export_service_1.ExportService,
        ingredient_service_1.IngredientService,
        lib_2.MessageService])
], validateDeleteExportIngredient);
let validateCreateIngredient = class validateCreateIngredient {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const name = req.body.name;
            const unitName = req.body.unitName;
            const image = req.body.image;
            if (!name) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_NAME_INGREDIENT_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!unitName) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_UNITNAME_INGREDIENT_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!image) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_IMAGE_INGREDIENT_ERROR',
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
exports.validateCreateIngredient = validateCreateIngredient;
exports.validateCreateIngredient = validateCreateIngredient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_2.MessageService])
], validateCreateIngredient);
let validateCheckOut = class validateCheckOut {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const shippingFee = req.body.shippingFee;
            const shippingCompanyId = req.body.shippingCompanyId;
            const paymentMethod = req.body.paymentMethod;
            if (!shippingFee) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SHIPPINGFEE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!shippingCompanyId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SHIPPINGFEE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!paymentMethod) {
                throw new common_1.HttpException({
                    messageCode: 'PAYMENT_METHOD_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(shippingFee)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SHIPPINGFEE_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (shippingFee < 0) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SHIPPINGFEE_ERROR2',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const checkShippingCompany = await this.service.checkExist(shippingCompanyId);
            if (!checkShippingCompany) {
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
exports.validateCheckOut = validateCheckOut;
exports.validateCheckOut = validateCheckOut = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shipping_company_service_1.ShippingCompanyService,
        lib_2.MessageService])
], validateCheckOut);
let validateCheckOut1 = class validateCheckOut1 {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const shippingFee = req.body.shippingFee;
            const shippingCompanyId = req.body.shippingCompanyId;
            const paymentMethod = req.body.paymentMethod;
            if (!shippingFee) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SHIPPINGFEE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!shippingCompanyId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SHIPPINGFEE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!paymentMethod) {
                throw new common_1.HttpException({
                    messageCode: 'PAYMENT_METHOD_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(shippingFee)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SHIPPINGFEE_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (shippingFee < 0) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_SHIPPINGFEE_ERROR2',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const checkShippingCompany = await this.service.checkExist(shippingCompanyId);
            if (!checkShippingCompany) {
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
exports.validateCheckOut1 = validateCheckOut1;
exports.validateCheckOut1 = validateCheckOut1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shipping_company_service_1.ShippingCompanyService,
        lib_2.MessageService])
], validateCheckOut1);
let validateFromDateToDate = class validateFromDateToDate {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const fromDate = req.query.fromdate;
            const toDate = req.query.todate;
            if (fromDate) {
                if (!(0, lib_1.isValidDate)(fromDate)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_FROMDATE_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if ((0, lib_1.isDateGreaterThanNow)(fromDate)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_FROMDATE_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (toDate) {
                if (!(0, lib_1.isValidDate)(toDate)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_TODATE_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if ((0, lib_1.isDateGreaterThanNow)(toDate)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_TODATE_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (toDate && fromDate) {
                if (toDate < fromDate) {
                    throw new common_1.HttpException({
                        messageCode: 'FROMDATE_TODATE_ERROR',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
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
exports.validateFromDateToDate = validateFromDateToDate;
exports.validateFromDateToDate = validateFromDateToDate = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shipping_company_service_1.ShippingCompanyService,
        lib_2.MessageService])
], validateFromDateToDate);
let validateCreateRecipe = class validateCreateRecipe {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const name = req.body.name;
            const price = req.body.price;
            const typeId = req.body.typeId;
            if (!name) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_NAME_RECIPE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!typeId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_TYPE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!price) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PRICE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(price)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PRICE_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isPositiveNum)(price)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PRICE_ERROR2',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const checkType = await this.service.checkExist(typeId);
            if (!checkType) {
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
exports.validateCreateRecipe = validateCreateRecipe;
exports.validateCreateRecipe = validateCreateRecipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_service_1.TypeService,
        lib_2.MessageService])
], validateCreateRecipe);
let validateUpdateRecipe = class validateUpdateRecipe {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const discount = req.body.discount;
            const price = req.body.price;
            if (discount) {
                if (!(0, lib_1.isNumberic)(discount)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_DISCOUNT_ERROR',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (discount < 0 || discount > 100) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_DISCOUNT_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (price) {
                if (!(0, lib_1.isNumberic)(price)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PRICE_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!(0, lib_1.isPositiveNum)(price)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PRICE_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
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
exports.validateUpdateRecipe = validateUpdateRecipe;
exports.validateUpdateRecipe = validateUpdateRecipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_service_1.TypeService,
        lib_2.MessageService])
], validateUpdateRecipe);
let validateCreateReview = class validateCreateReview {
    constructor(service1, service2, messageService) {
        this.service1 = service1;
        this.service2 = service2;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const rating = req.body.rating;
            const invoiceId = req.body.invoiceId;
            const productId = req.body.productId;
            if (!rating) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_STAR_RATING_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(rating)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_STAR_RATING_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (rating < 1 || rating > 5) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_STAR_RATING_ERROR2',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!invoiceId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_INVOICE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!productId) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PRODUCT_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const checkInvoice = await this.service1.checkExist(invoiceId);
            const checkProduct = await this.service2.checkExist(productId);
            if (!checkInvoice) {
                throw new common_1.HttpException({
                    messageCode: 'INVOICE_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!checkProduct) {
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
exports.validateCreateReview = validateCreateReview;
exports.validateCreateReview = validateCreateReview = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService,
        product_service_1.ProductService,
        lib_2.MessageService])
], validateCreateReview);
let validateCreateShippingCompany = class validateCreateShippingCompany {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const costPerKm = req.body.costPerKm;
            if (!costPerKm) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_COSTPERKM_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(costPerKm)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_COSTPERKM_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (costPerKm <= 0) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_COSTPERKM_ERROR2',
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
exports.validateCreateShippingCompany = validateCreateShippingCompany;
exports.validateCreateShippingCompany = validateCreateShippingCompany = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_2.MessageService])
], validateCreateShippingCompany);
let validateUpdateShippingCompany = class validateUpdateShippingCompany {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const costPerKm = req.body.costPerKm;
            if (costPerKm) {
                if (!(0, lib_1.isNumberic)(costPerKm)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_COSTPERKM_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (costPerKm <= 0) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_COSTPERKM_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
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
exports.validateUpdateShippingCompany = validateUpdateShippingCompany;
exports.validateUpdateShippingCompany = validateUpdateShippingCompany = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_2.MessageService])
], validateUpdateShippingCompany);
let validateUpdateShop = class validateUpdateShop {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const upSizePrice = req.body.upSizePrice;
            const isActive = req.body.isActive;
            const latitude = req.body.latitude;
            const longitude = req.body.longitude;
            if (upSizePrice) {
                if (!(0, lib_1.isNumberic)(upSizePrice)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_UPSIZE_ERROR',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (upSizePrice <= 0) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_UPSIZE_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (latitude) {
                if (!(0, lib_1.isLatitude)(latitude)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_LATITUDE_ERROR',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (longitude) {
                if (!(0, lib_1.isLongitude)(longitude)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_LONGITUDE_ERROR',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
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
exports.validateUpdateShop = validateUpdateShop;
exports.validateUpdateShop = validateUpdateShop = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lib_2.MessageService])
], validateUpdateShop);
let validateCreateStaff = class validateCreateStaff {
    constructor(service1, service2, messageService) {
        this.service1 = service1;
        this.service2 = service2;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const name = req.body.name;
            const phone = req.body.phone;
            const password = req.body.password;
            if (!name) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_STAFF_NAME_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!phone) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(phone)) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (phone.length != 10) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PHONE_ERROR2',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!password) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (password.length < 6) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const checkPhone = await this.service1.checkExistPhone(phone);
            if (checkPhone) {
                throw new common_1.HttpException({
                    messageCode: 'PHONE_ISEXIST_ERROR',
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
exports.validateCreateStaff = validateCreateStaff;
exports.validateCreateStaff = validateCreateStaff = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        staff_service_1.StaffService,
        lib_2.MessageService])
], validateCreateStaff);
let validateUpdateStaff = class validateUpdateStaff {
    constructor(service1, service2, messageService) {
        this.service1 = service1;
        this.service2 = service2;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const phone = req.body.phone;
            const password = req.body.password;
            if (password) {
                if (password.length < 6) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PASSWORD_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (phone) {
                if (!(0, lib_1.isNumberic)(phone)) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PHONE_ERROR1',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (phone.length != 10) {
                    throw new common_1.HttpException({
                        messageCode: 'INPUT_PHONE_ERROR2',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                const checkPhone = await this.service1.checkExistPhone(phone);
                if (checkPhone) {
                    throw new common_1.HttpException({
                        messageCode: 'PHONE_ISEXIST_ERROR',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
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
exports.validateUpdateStaff = validateUpdateStaff;
exports.validateUpdateStaff = validateUpdateStaff = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        staff_service_1.StaffService,
        lib_2.MessageService])
], validateUpdateStaff);
let validateCompleteImportExport = class validateCompleteImportExport {
    constructor(service1, service2, messageService) {
        this.service1 = service1;
        this.service2 = service2;
        this.messageService = messageService;
    }
    async use(req, res, next) {
        try {
            const id = req.params.id;
            const checkImport = await this.service1.findOne(+id);
            const checkExport = await this.service2.findOne(+id);
            if (checkImport) {
                if (checkImport.isCompleted != 0) {
                    throw new common_1.HttpException({
                        messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (checkExport) {
                if (checkExport.isCompleted != 0) {
                    throw new common_1.HttpException({
                        messageCode: 'STATUS_IMPORT_EXPORT_ERROR',
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
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
exports.validateCompleteImportExport = validateCompleteImportExport;
exports.validateCompleteImportExport = validateCompleteImportExport = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [import_service_1.ImportService,
        export_service_1.ExportService,
        lib_2.MessageService])
], validateCompleteImportExport);
//# sourceMappingURL=validate.js.map