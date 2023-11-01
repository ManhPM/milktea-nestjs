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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const lib_1 = require("../common/lib");
let AuthGuard = class AuthGuard {
    constructor(jwtService, messageService) {
        this.jwtService = jwtService;
        this.messageService = messageService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['token'];
        try {
            if (!token) {
                throw new common_1.HttpException({
                    messageCode: 'UNAUTHORIZED',
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET,
            });
            if (payload.account.role === 0) {
                const data = {
                    id: 0,
                    accountId: 0,
                    name: '',
                    phone: '',
                    address: '',
                    photo: '',
                };
                data.id = payload.account.user[0].id;
                data.name = payload.account.user[0].name;
                data.phone = payload.account.phone;
                data.accountId = payload.account.id;
                data.address = payload.account.user[0].address;
                data.photo = payload.account.user[0].photo;
                request['user'] = data;
                request['role'] = Object(payload.account.role);
            }
            else {
                const data = {
                    id: 0,
                    name: '',
                    phone: '',
                    accountId: 0,
                };
                data.id = payload.account.staff[0].id;
                data.name = payload.account.staff[0].name;
                data.phone = payload.account.phone;
                data.accountId = payload.account.id;
                request['user'] = data;
                request['role'] = Object(payload.account.role);
            }
        }
        catch (error) {
            let message;
            if (error.response) {
                message = await this.messageService.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            else {
                console.log(error);
                message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        lib_1.MessageService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map