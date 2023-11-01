"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffModule = void 0;
const validate_1 = require("./../common/middlewares/validate");
const common_1 = require("@nestjs/common");
const staff_service_1 = require("./staff.service");
const staff_controller_1 = require("./staff.controller");
const staff_entity_1 = require("./entities/staff.entity");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../account/entities/account.entity");
const middlewares_1 = require("../common/middlewares/middlewares");
const auth_service_1 = require("../auth/auth.service");
const user_entity_1 = require("../user/entities/user.entity");
const lib_1 = require("../common/lib");
const verify_entity_1 = require("../verify/entities/verify.entity");
let StaffModule = class StaffModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistStaff)
            .forRoutes({ path: 'staff/:id', method: common_1.RequestMethod.ALL });
        consumer
            .apply(validate_1.validateCreateStaff)
            .forRoutes({ path: 'staff', method: common_1.RequestMethod.POST });
        consumer
            .apply(validate_1.validateUpdateStaff)
            .forRoutes({ path: 'staff', method: common_1.RequestMethod.PATCH });
    }
};
exports.StaffModule = StaffModule;
exports.StaffModule = StaffModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([staff_entity_1.Staff, account_entity_1.Account, user_entity_1.User, verify_entity_1.Verify])],
        controllers: [staff_controller_1.StaffController],
        providers: [staff_service_1.StaffService, auth_service_1.AuthService, lib_1.MessageService],
    })
], StaffModule);
//# sourceMappingURL=staff.module.js.map