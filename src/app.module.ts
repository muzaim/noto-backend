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
import { HolidayPeriodsModule } from './master-data/holiday-periods/holiday-periods.module';
import { HolidayModule } from './master-data/holidays/holiday.module';
import { CurrencyModule } from './master-data/currencies/currency.module';
import { MaritalStatusModule } from './master-data/marital-status/marital-status.module';
import { EducationalLevelsModule } from './master-data/educational-levels/educational-levels.module';
import { DocumentTypesModule } from './master-data/document-types/document-types.module';
import { CompetenceTypesModule } from './master-data-competency/competence-types/competence-types.module';
import { CompetenceGroupsModule } from './master-data-competency/competence-groups/competence-groups.module';
import { CompetenceDimensionsModule } from './master-data-competency/competence-dimensions/competence-dimensions.module';
import { CompetencyDictionaryModule } from './master-data-competency/competence-dictionary/competence-dictionary.module';
import { DimensionLevelsModule } from './master-data-competency/dimension-levels/dimension-levels.module';
import { AttendanceStatusModule } from './master-data/attendance-status/attendance-status.module';
import { JobsModule } from './master-data/jobs/jobs.module';
import { LeaveCategoriesModule } from './master-data/leave-categories/leave-categories.module';
import { LeaveTypesModule } from './master-data/leave-types/leave-types.module';
import { MasterLeavesModule } from './master-data/master-leaves/master-leaves.module';
import { PayrollComponentsModule } from './master-data/payroll-components/payroll-components.module';
import { ResignationStatusModule } from './master-data/resignation-status/resignation-status.module';
import { WarningDetailsModule } from './master-data/warning-details/warning-details.module';
import { WarningMasterDataModule } from './master-data/warning-master-data/warning-master-data.module';
import { WarningTypesModule } from './master-data/warning-types/warning-types.module';
import { ClassificationsModule } from './master-personalization/classifications/classification.module';
import { ClustersModule } from './master-personalization/clusters/cluster.module';

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
    HolidayPeriodsModule,
    HolidayModule,
    CurrencyModule,
    MaritalStatusModule,
    EducationalLevelsModule,
    DocumentTypesModule,
    AttendanceStatusModule,
    JobsModule,
    LeaveCategoriesModule,
    LeaveTypesModule,
    MasterLeavesModule,
    PayrollComponentsModule,
    ResignationStatusModule,
    WarningDetailsModule,
    WarningMasterDataModule,
    WarningTypesModule,
    
    // Master Data Competence
    CompetenceTypesModule,
    CompetenceGroupsModule,
    CompetenceDimensionsModule,
    CompetencyDictionaryModule,

    // Master Data Personalization
    ClassificationsModule,
    ClustersModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
