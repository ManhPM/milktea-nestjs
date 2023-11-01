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
exports.isLessThan15Years = exports.isDateGreaterThanNow = exports.isLongitude = exports.isLatitude = exports.calDistance = exports.isBit = exports.isPositiveNum = exports.deg2rad = exports.isValidDate = exports.isNumberic = exports.convertPhoneNumber = exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const Excel = require("exceljs");
const common_2 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const path = require("path");
let MessageService = class MessageService {
    constructor(request) {
        this.request = request;
    }
    async getMessage(messageCode) {
        try {
            const workbook = new Excel.Workbook();
            const filePath = path.join(__dirname, 'message.xlsx');
            await workbook.xlsx.readFile('src/common/message.xlsx');
            const worksheet = workbook.getWorksheet('Sheet1');
            let message;
            let language = 'VI';
            if (this.request.query.language) {
                language = this.request.query.language;
            }
            for (let i = 2; i <= worksheet.rowCount; i++) {
                const firstRow = worksheet.getRow(1);
                const row = worksheet.getRow(i);
                for (let i = 2; i <= worksheet.columnCount; i++) {
                    if (firstRow.getCell(i).value == language &&
                        row.getCell(1).value == messageCode) {
                        message = row.getCell(i).value;
                        break;
                    }
                }
            }
            if (!message) {
                throw new common_1.HttpException({
                    messageCode: 'MESSAGE_NOTFOUND',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                return message;
            }
        }
        catch (error) {
            if (error.response) {
                const message = await this.getMessage(error.response.messageCode);
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                const message = await this.getMessage('INTERNAL_SERVER_ERROR');
                throw new common_1.HttpException({
                    message: message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_2.Injectable)({ scope: common_2.Scope.REQUEST }),
    __param(0, (0, common_2.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], MessageService);
function convertPhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
        return '+84' + phoneNumber.slice(1);
    }
    return phoneNumber;
}
exports.convertPhoneNumber = convertPhoneNumber;
function isNumberic(phone) {
    const regex = /^[0-9]+$/;
    return regex.test(phone);
}
exports.isNumberic = isNumberic;
function isValidDate(value) {
    const date = new Date(value);
    return date.toString() !== 'Invalid Date';
}
exports.isValidDate = isValidDate;
function deg2rad(num) {
    return num * (Math.PI / 180);
}
exports.deg2rad = deg2rad;
function isPositiveNum(num) {
    return num > 0;
}
exports.isPositiveNum = isPositiveNum;
function isBit(num) {
    if (num != 0 && num != 1) {
        return false;
    }
    else {
        return true;
    }
}
exports.isBit = isBit;
function calDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = Number((R * c).toFixed(2));
    return distance;
}
exports.calDistance = calDistance;
function isLatitude(lat) {
    return isFinite(lat) && Math.abs(lat) <= 90;
}
exports.isLatitude = isLatitude;
function isLongitude(lng) {
    return isFinite(lng) && Math.abs(lng) <= 180;
}
exports.isLongitude = isLongitude;
function isDateGreaterThanNow(dateString) {
    const dateToCheck = new Date(dateString);
    const now = new Date();
    now.setHours(now.getHours() + 7);
    return dateToCheck > now;
}
exports.isDateGreaterThanNow = isDateGreaterThanNow;
function isLessThan15Years(date1, date2) {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return diffYears < 15;
}
exports.isLessThan15Years = isLessThan15Years;
//# sourceMappingURL=lib.js.map