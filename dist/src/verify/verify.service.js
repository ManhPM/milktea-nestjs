"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyService = void 0;
const common_1 = require("@nestjs/common");
let VerifyService = class VerifyService {
    create(createVerifyDto) {
        return 'This action adds a new verify';
    }
    findAll() {
        console.log();
        return `This action returns all verify`;
    }
    findOne(id) {
        return `This action returns a #${id} verify`;
    }
    update(id, updateVerifyDto) {
        return `This action updates a #${id} verify`;
    }
    remove(id) {
        return `This action removes a #${id} verify`;
    }
};
exports.VerifyService = VerifyService;
exports.VerifyService = VerifyService = __decorate([
    (0, common_1.Injectable)()
], VerifyService);
//# sourceMappingURL=verify.service.js.map