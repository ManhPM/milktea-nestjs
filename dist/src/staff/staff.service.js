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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const staff_entity_1 = require("./entities/staff.entity");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("../account/entities/account.entity");
const lib_1 = require("../common/lib");
let StaffService = class StaffService {
    constructor(staffRepository, accountRepository, dataSource, messageService) {
        this.staffRepository = staffRepository;
        this.accountRepository = accountRepository;
        this.dataSource = dataSource;
        this.messageService = messageService;
    }
    async create(item) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hash(item.password, salt);
            item.password = hashPassword;
            item.isActive = 1;
            item.role = 1;
            const account = await this.accountRepository.save({
                ...item,
            });
            await this.staffRepository.save({
                ...item,
                account,
            });
            const message = await this.messageService.getMessage('CREATE_SUCCESS');
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
    async checkExist(id) {
        try {
            return await this.staffRepository.findOne({
                where: { id },
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
    async findAll() {
        try {
            const res = await this.staffRepository.find({
                relations: ['account'],
                select: {
                    account: {
                        phone: true,
                        role: true,
                    },
                },
            });
            if (res[0]) {
                const data = [
                    {
                        id: 0,
                        name: '',
                        phone: '',
                        role: 0,
                        isActive: 0,
                    },
                ];
                for (let i = 0; i < res.length; i++) {
                    data[i] = {
                        id: res[i].id,
                        name: res[i].name,
                        phone: res[i].account.phone,
                        role: res[i].account.role,
                        isActive: res[i].isActive,
                    };
                }
                return {
                    data: data,
                };
            }
            return {
                data: null,
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
    async findOne(id) {
        try {
            const res = await this.staffRepository.findOne({
                where: {
                    id: id,
                },
                relations: ['account'],
            });
            delete res.account.password;
            return {
                data: res,
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
    async update(id, item) {
        return await this.dataSource.transaction(async (transactionalEntityManager) => {
            try {
                const staff = await transactionalEntityManager
                    .getRepository(staff_entity_1.Staff)
                    .findOne({
                    where: {
                        id: id,
                    },
                    relations: ['account'],
                });
                await transactionalEntityManager.update(staff_entity_1.Staff, id, {
                    name: item.name,
                    isActive: item.isActive,
                    account: staff.account,
                });
                if (item.phone || item.password || item.role) {
                    if (item.password) {
                        const salt = bcrypt.genSaltSync(10);
                        const hashPassword = await bcrypt.hash(item.password, salt);
                        item.password = hashPassword;
                    }
                    await transactionalEntityManager.update(account_entity_1.Account, staff.account.id, {
                        password: item.password,
                        phone: item.phone,
                        role: item.role,
                    });
                }
                const message = await this.messageService.getMessage('UPDATE_SUCCESS');
                return {
                    message: message,
                };
            }
            catch (error) {
                const message = await this.messageService.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    async remove(id) {
        try {
            await this.staffRepository.update(id, {
                isActive: 0,
            });
            const message = await this.messageService.getMessage('DELETE_SUCCESS');
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
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(1, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        lib_1.MessageService])
], StaffService);
//# sourceMappingURL=staff.service.js.map