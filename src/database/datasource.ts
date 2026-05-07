import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: ['src/**/*.entity{.ts,.js}', 'src/**/**/*.entity{.ts,.js}'],
  migrations: ['src/migration/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',

  // kalau DATABASE_SYNC = 1 → langsung sync schema, kalau bukan → pakai migration
  synchronize: true,
  migrationsRun: Number(process.env.DATABASE_SYNC) !== 1,

  logging: true,
});

// export default biar gampang dipanggil di CLI
module.exports = { dataSource };
