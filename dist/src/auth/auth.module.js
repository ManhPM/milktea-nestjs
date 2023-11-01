"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../account/entities/account.entity");
const user_entity_1 = require("../user/entities/user.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const middlewares_1 = require("../common/middlewares/middlewares");
const validate_1 = require("../common/middlewares/validate");
const lib_1 = require("../common/lib");
const verify_entity_1 = require("../verify/entities/verify.entity");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(validate_1.validateLogin, middlewares_1.CheckExistPhone)
            .forRoutes({ path: 'auth/login', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateRegister)
            .forRoutes({ path: 'auth/register', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateChangePassword)
            .forRoutes({ path: 'auth/changepassword', method: common_1.RequestMethod.POST });
        consumer
            .apply(middlewares_1.CheckExistPhone, validate_1.validateForgotPassword)
            .forRoutes({ path: 'auth/forgotpassword', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateUpdateUser)
            .forRoutes({ path: 'auth/profile', method: common_1.RequestMethod.PATCH });
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([account_entity_1.Account, user_entity_1.User, mailer_1.MailerService, verify_entity_1.Verify])],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, lib_1.MessageService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map