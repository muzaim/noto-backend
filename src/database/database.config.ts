import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import * as dotenv from 'dotenv';
dotenv.config();

const dbSync = parseInt(process.env.DB_SYNC || '0');

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: process.env.DB_SYNC === 'true',
  logging: ['error'],
};

export default config;
