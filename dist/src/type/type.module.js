"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeModule = void 0;
const common_1 = require("@nestjs/common");
const type_service_1 = require("./type.service");
const type_controller_1 = require("./type.controller");
const type_entity_1 = require("./entities/type.entity");
const typeorm_1 = require("@nestjs/typeorm");
const middlewares_1 = require("../common/middlewares/middlewares");
const lib_1 = require("../common/lib");
let TypeModule = class TypeModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.CheckExistType)
            .forRoutes({ path: 'type/:id', method: common_1.RequestMethod.ALL });
        consumer
            .apply(middlewares_1.CheckCreateType)
            .forRoutes({ path: 'type', method: common_1.RequestMethod.POST });
    }
};
exports.TypeModule = TypeModule;
exports.TypeModule = TypeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([type_entity_1.Type])],
        controllers: [type_controller_1.TypeController],
        providers: [type_service_1.TypeService, lib_1.MessageService],
    })
], TypeModule);
//# sourceMappingURL=type.module.js.map