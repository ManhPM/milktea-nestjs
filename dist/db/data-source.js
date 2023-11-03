"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const dev = false;
exports.dataSourceOptions = {
    type: 'mysql',
    host: dev
        ? 'localhost'
        : 'brtzudg8yfixwo1kmee0-mysql.services.clever-cloud.com',
    port: 3306,
    username: dev ? 'root' : 'uy3tjedf7fsdcssc',
    password: dev ? '15092001' : 't7khjsfkB5Hi2m2sgvuh',
    database: dev ? 'milktea-nestjs' : 'brtzudg8yfixwo1kmee0',
    entities: ['**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false,
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map