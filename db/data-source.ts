import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '15092001',
  database: 'milktea-nestjs',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  timezone: 'Asia/Ho_Chi_Minh',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
