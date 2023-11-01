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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lib_1 = require("../common/lib");
let UserService = class UserService {
    constructor(userRepository, messageService) {
        this.userRepository = userRepository;
        this.messageService = messageService;
    }
    create(createUserDto) {
        return 'This action adds a new user';
    }
    async findAll() {
        try {
            const [res, total] = await this.userRepository.findAndCount({
                relations: ['account'],
                select: {
                    account: {
                        phone: true,
                    },
                },
            });
            if (res[0]) {
                const data = [
                    {
                        id: 0,
                        name: '',
                        phone: '',
                        address: '',
                        photo: '',
                    },
                ];
                for (let i = 0; i < res.length; i++) {
                    data[i] = {
                        id: res[i].id,
                        name: res[i].name,
                        address: res[i].address,
                        phone: res[i].account.phone,
                        photo: res[i].photo,
                    };
                }
                return {
                    data: data,
                };
            }
            return {
                data: res,
                total,
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
    async getProfile(req) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    account: req.user.id,
                },
                relations: ['account'],
            });
            if (user) {
                const data = {
                    id: 0,
                    name: '',
                    phone: '',
                    address: '',
                    photo: '',
                };
                data.id = user.id;
                data.name = user.name;
                data.phone = user.account.phone;
                data.address = user.address;
                data.photo = user.photo;
                return {
                    data: data,
                };
            }
            return {
                data: user,
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
    async findOne(id) {
        return 'user';
    }
    async update(req, updateUserDto) {
        try {
            await this.userRepository.update(req.user.id, {
                ...updateUserDto,
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
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getProfile", null);
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "update", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        lib_1.MessageService])
], UserService);
//# sourceMappingURL=user.service.js.map