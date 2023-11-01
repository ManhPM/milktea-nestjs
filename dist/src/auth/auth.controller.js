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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_service_1 = require("./auth.service");
const create_account_dto_1 = require("../account/dto/create-account.dto");
const update_account_dto_1 = require("../account/dto/update-account.dto");
const cloudinary_1 = require("cloudinary");
const auth_guard_1 = require("./auth.guard");
const roles_guard_1 = require("./roles.guard");
const roles_decorator_1 = require("./roles.decorator");
const lib_1 = require("../common/lib");
const changepassword_dto_1 = require("../user/dto/changepassword.dto");
cloudinary_1.v2.config({
    cloud_name: 'dgsumh8ih',
    api_key: '726416339718441',
    api_secret: 'n9z2-8LwGN8MPhbDadWYuMGN78U',
});
let AuthController = class AuthController {
    constructor(authService, jwtService, messageService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.messageService = messageService;
    }
    async uploadFile(file) {
        try {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
            const cldRes = await cloudinary_1.v2.uploader.upload(dataURI, {
                resource_type: 'auto',
            });
            return {
                url: cldRes.url,
            };
        }
        catch (error) {
            return {
                message: error.message,
            };
        }
    }
    async checkPhone(phone) {
        return await this.authService.checkCreatePhone(phone);
    }
    async refreshToken(req, response) {
        const oldToken = req.cookies['refreshToken'];
        const payload = await this.jwtService.verifyAsync(oldToken, {
            secret: process.env.SECRET,
        });
        if (payload) {
            const account = await this.authService.findOne(`${payload.account.phone}`);
            const token = await this.jwtService.signAsync({ account });
            const userInfo = {
                phone: '',
                accountId: 1,
                userId: 1,
                role: 0,
                name: '',
                address: '',
                photo: '',
            };
            userInfo.phone = account.phone;
            userInfo.accountId = account.id;
            userInfo.role = account.role;
            if (account.role == 0) {
                userInfo.userId = account.user[0].id;
                userInfo.name = account.user[0].name;
                userInfo.address = account.user[0].address;
                userInfo.photo = account.user[0].photo;
            }
            else {
                userInfo.userId = account.staff[0].id;
                userInfo.name = account.staff[0].name;
                userInfo.address = account.staff[0].address;
            }
            const refreshToken = await this.jwtService.signAsync({ account });
            const dateToken = new Date();
            dateToken.setHours(dateToken.getHours() + 7);
            dateToken.setDate(dateToken.getDate() + 7);
            const dateRefreshToken = new Date();
            dateRefreshToken.setHours(dateRefreshToken.getHours() + 7);
            dateRefreshToken.setDate(dateRefreshToken.getDate() + 14);
            response
                .cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: dateToken,
            })
                .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: dateRefreshToken,
            });
            return {
                userInfo: userInfo,
            };
        }
        return null;
    }
    async login(phone, loginPassword, response) {
        try {
            const account = await this.authService.findOne(`${phone}`);
            if (!(await bcrypt.compare(loginPassword, account.password))) {
                throw new common_1.HttpException({
                    messageCode: 'AUTH_ERROR',
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            if (account.role != 0) {
                if (account.staff.length) {
                    if (!account.staff[0].isActive) {
                        throw new common_1.HttpException({
                            messageCode: 'AUTH_ERROR1',
                        }, common_1.HttpStatus.UNAUTHORIZED);
                    }
                }
            }
            const token = await this.jwtService.signAsync({ account });
            const userInfo = {
                phone: '',
                accountId: 1,
                userId: 1,
                role: 0,
                name: '',
                address: '',
                photo: '',
            };
            userInfo.phone = account.phone;
            userInfo.accountId = account.id;
            userInfo.role = account.role;
            if (account.role == 0) {
                userInfo.userId = account.user[0].id;
                userInfo.name = account.user[0].name;
                userInfo.address = account.user[0].address;
                userInfo.photo = account.user[0].photo;
            }
            else {
                userInfo.userId = account.staff[0].id;
                userInfo.name = account.staff[0].name;
                userInfo.address = account.staff[0].address;
            }
            const refreshToken = await this.jwtService.signAsync({ account });
            const dateToken = new Date();
            dateToken.setHours(dateToken.getHours() + 7);
            dateToken.setDate(dateToken.getDate() + 7);
            const dateRefreshToken = new Date();
            dateRefreshToken.setHours(dateRefreshToken.getHours() + 7);
            dateRefreshToken.setDate(dateRefreshToken.getDate() + 14);
            response
                .cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: dateToken,
            })
                .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: dateRefreshToken,
            });
            const message = await this.messageService.getMessage('LOGIN_SUCCESS');
            return {
                userInfo: userInfo,
                message: message,
            };
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
    async logout(response) {
        response.clearCookie('token');
        const message = await this.messageService.getMessage('LOGOUT_SUCCESS');
        return {
            message: message,
        };
    }
    async changePassword(req, item) {
        return this.authService.changePassword(req, item);
    }
    async forgotPassword(item) {
        return this.authService.forgotPassword(item);
    }
    async register(item) {
        return this.authService.create(item);
    }
    async sendSMS(phone) {
        return this.authService.sendSms(phone);
    }
    async verify(phone, verifyID) {
        return this.authService.verify(phone, verifyID);
    }
    async update(req, item, response) {
        return this.authService.update(req, item, response);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('0', '2'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('my_file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('check-phone/:phone'),
    __param(0, (0, common_1.Param)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkPhone", null);
__decorate([
    (0, common_1.Get)('refresh-token'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('phone')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('changepassword'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, changepassword_dto_1.ChangePassword]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('forgotpassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changepassword_dto_1.ChangePassword]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('sms'),
    __param(0, (0, common_1.Body)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendSMS", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)('phone')),
    __param(1, (0, common_1.Body)('verifyID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('0'),
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_account_dto_1.UpdateAccountDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService,
        lib_1.MessageService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map