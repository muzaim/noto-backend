import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './database/database.config';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import { CommonModule } from './common/common.module';
import { ReligionModule } from './master-data/religions/religion.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 1. Memuat file .env agar bisa digunakan di process.env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      ignoreEnvFile: false,
    }),

    // 2. Konfigurasi Pino Logger
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          genReqId: (req) =>
            req.headers['x-correlation-id'] ||
            req.headers['x-request-id'] ||
            randomUUID(),
          level: config.get('NODE_ENV') !== 'production' ? 'debug' : 'info',
          transport:
            config.get('NODE_ENV') !== 'production'
              ? {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                    colorize: true,
                    levelFirst: true,
                    translateTime: 'SYS:standard',
                    messageFormat: '{req.id} [{context}] {msg}',
                    ignore: 'pid,hostname,req,res,responseTime',
                  },
                }
              : undefined,
        },
      }),
    }),

    // 3. Konfigurasi Database menggunakan TypeORM
    TypeOrmModule.forRoot({
      ...databaseConfig,
    }),

    CommonModule,
    ReligionModule,
    AuthModule,
    UsersModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
