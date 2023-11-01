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
exports.AuthService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const account_entity_1 = require("../account/entities/account.entity");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const update_account_dto_1 = require("../account/dto/update-account.dto");
const lib_1 = require("../common/lib");
const verify_entity_1 = require("../verify/entities/verify.entity");
const changepassword_dto_1 = require("../user/dto/changepassword.dto");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(accountRepository, userRepository, verifyRepository, mailerService, jwtService, messageService) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.verifyRepository = verifyRepository;
        this.mailerService = mailerService;
        this.jwtService = jwtService;
        this.messageService = messageService;
    }
    async sendSms(phoneNumber) { }
    async verify(phoneNumber, verifyID) {
        try {
            if (verifyID.length < 6) {
                throw new common_1.HttpException({
                    messageCode: 'VERIFY_ERROR1',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!(0, lib_1.isNumberic)(verifyID)) {
                throw new common_1.HttpException({
                    messageCode: 'VERIFY_ERROR2',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const date = new Date();
            date.setHours(date.getHours() - 3);
            const phoneVerify = await this.verifyRepository.findOne({
                where: {
                    phone: phoneNumber,
                    verifyID: verifyID,
                },
            });
            if (!phoneVerify) {
                throw new common_1.HttpException({
                    messageCode: 'VERIFY_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (phoneVerify.expireAt <= date) {
                console.log(phoneVerify);
                throw new common_1.HttpException({
                    messageCode: 'VERIFY_ERROR3',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const phoneList = await this.verifyRepository.find({
                where: {
                    phone: phoneNumber,
                },
            });
            for (const phone of phoneList) {
                await this.verifyRepository.delete(phone.id);
            }
            const message = await this.messageService.getMessage('VERIFY_SUCCESS');
            return {
                message: message,
            };
        }
        catch (error) {
            let message = '';
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
    async changePassword(req, item) {
        try {
            const account = await this.accountRepository.findOne({
                where: {
                    phone: (0, typeorm_2.Like)(req.user.phone),
                },
            });
            if (!(await bcrypt.compare(item.oldPassword, account.password))) {
                throw new common_1.HttpException({
                    messageCode: 'INPUT_PASSWORD_ERROR5',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (item.newPassword == item.oldPassword) {
                throw new common_1.HttpException({
                    messageCode: 'CHANGE_PASSWORD_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hash(item.newPassword, salt);
            await this.accountRepository.update(account.id, {
                password: hashPassword,
            });
            const message = await this.messageService.getMessage('CHANGE_PASSWORD_SUCCESS');
            return {
                message: message,
            };
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
    async forgotPassword(item) {
        try {
            const account = await this.accountRepository.findOne({
                where: {
                    phone: (0, typeorm_2.Like)(item.phone),
                },
            });
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hash(item.newPassword, salt);
            await this.accountRepository.update(account.id, {
                password: hashPassword,
            });
            const message = await this.messageService.getMessage('FORGOT_PASSWORD_SUCCESS');
            return {
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
    async create(createAccountDto) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hash(createAccountDto.password, salt);
            createAccountDto.password = hashPassword;
            createAccountDto.role = 0;
            createAccountDto.address = 'Địa chỉ';
            createAccountDto.photo =
                'https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-nguoi-giau-mat-ngau-29-10-40-01.jpg';
            const account = await this.accountRepository.save({
                ...createAccountDto,
            });
            await this.userRepository.save({
                ...createAccountDto,
                account,
            });
            const message = await this.messageService.getMessage('REGISTER_SUCCESS');
            return {
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
    async update(req, updateAccountDto, response) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: req.user.id,
                },
                relations: ['account'],
            });
            await this.accountRepository.update(user.account.id, {
                phone: updateAccountDto.phone
                    ? updateAccountDto.phone
                    : user.account.phone,
            });
            await this.userRepository.update(user.id, {
                address: updateAccountDto.address
                    ? updateAccountDto.address
                    : user.address,
                name: updateAccountDto.name ? updateAccountDto.name : user.name,
                photo: updateAccountDto.photo ? updateAccountDto.photo : user.photo,
            });
            if (updateAccountDto.phone) {
                const account = await this.findOne(`${updateAccountDto.phone}`);
                const token = await this.jwtService.signAsync({ account });
                const dateToken = new Date();
                dateToken.setHours(dateToken.getHours() + 7);
                dateToken.setDate(dateToken.getDate() + 7);
                response.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    expires: dateToken,
                });
            }
            const message = await this.messageService.getMessage('UPDATE_SUCCESS');
            return {
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
    async findOne(phone) {
        try {
            return await this.accountRepository.findOne({
                where: { phone },
                relations: ['user', 'staff'],
            });
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
    async checkCreatePhone(phone) {
        try {
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
            const account = await this.accountRepository.findOne({
                where: { phone },
            });
            if (account) {
                throw new common_1.HttpException({
                    messageCode: 'PHONE_ISEXIST_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                message: 'OK',
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
    async checkExistPhone(phone) {
        try {
            return await this.accountRepository.findOne({
                where: { phone },
            });
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
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, changepassword_dto_1.ChangePassword]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "changePassword", null);
__decorate([
    __param(0, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_account_dto_1.UpdateAccountDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "update", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(verify_entity_1.Verify)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService,
        jwt_1.JwtService,
        lib_1.MessageService])
], AuthService);
//# sourceMappingURL=auth.service.js.map