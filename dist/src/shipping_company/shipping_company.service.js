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
exports.ShippingCompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shipping_company_entity_1 = require("./entities/shipping_company.entity");
const shop_entity_1 = require("../shop/entities/shop.entity");
const lib_1 = require("../common/lib");
const lib_2 = require("../common/lib");
let ShippingCompanyService = class ShippingCompanyService {
    constructor(shippingCompanyRepository, shopRepository, messageService) {
        this.shippingCompanyRepository = shippingCompanyRepository;
        this.shopRepository = shopRepository;
        this.messageService = messageService;
    }
    async create(createShippingCompanyDto) {
        try {
            await this.shippingCompanyRepository.save({
                ...createShippingCompanyDto,
            });
            const message = await this.messageService.getMessage('CREATE_SUCCESS');
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
    async checkCreate(name, costPerKm) {
        try {
            return await this.shippingCompanyRepository.findOne({
                where: {
                    name: name,
                    costPerKm: costPerKm,
                },
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
    async update(id, updateShippingCompanyDto) {
        try {
            await this.shippingCompanyRepository.update(id, {
                ...updateShippingCompanyDto,
            });
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
    async remove(id) {
        try {
            await this.shippingCompanyRepository.update(id, {
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
    async checkExist(id) {
        try {
            return await this.shippingCompanyRepository.findOne({
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
            const res = await this.shippingCompanyRepository.find({
                where: {
                    isActive: 1,
                },
            });
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
    async getInfo(id) {
        try {
            const res = await this.shippingCompanyRepository.findOne({
                where: {
                    id: id,
                },
            });
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
    async getFeeShip(id, query) {
        try {
            const shippingCompany = await this.shippingCompanyRepository.findOne({
                where: {
                    id: id,
                },
            });
            const shop = await this.shopRepository.find({});
            const lat1 = query.userLat;
            const lon1 = query.userLng;
            const lat2 = Number(shop[0].latitude);
            const lon2 = Number(shop[0].longitude);
            const distance = (0, lib_1.calDistance)(lat1, lon1, lat2, lon2);
            let feeShip = 0;
            if (distance >= 20) {
                throw new common_1.HttpException({
                    messageCode: 'GET_FEESHIP_ERROR',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                if (distance < 2) {
                    feeShip = shippingCompany.costPerKm * 5;
                }
                else if (distance >= 2 && distance < 5) {
                    feeShip = shippingCompany.costPerKm * 5 + 5;
                }
                else if (distance >= 5 && distance < 10) {
                    feeShip = shippingCompany.costPerKm * 5 + 10;
                }
                else {
                    feeShip = shippingCompany.costPerKm * 5 + 10;
                }
                return {
                    data: feeShip,
                    distance: distance,
                };
            }
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
exports.ShippingCompanyService = ShippingCompanyService;
__decorate([
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ShippingCompanyService.prototype, "getFeeShip", null);
exports.ShippingCompanyService = ShippingCompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shipping_company_entity_1.ShippingCompany)),
    __param(1, (0, typeorm_1.InjectRepository)(shop_entity_1.Shop)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        lib_2.MessageService])
], ShippingCompanyService);
//# sourceMappingURL=shipping_company.service.js.map