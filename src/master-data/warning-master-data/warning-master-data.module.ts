import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarningMasterDataService } from './warning-master-data.service';
import { WarningMasterDataController } from './warning-master-data.controller';
import { WarningMasterDataEntity } from './entities/warning-master-data.entity';
import { WarningDetailsModule } from '../warning-details/warning-details.module';

@Module({
  imports: [TypeOrmModule.forFeature([WarningMasterDataEntity]), WarningDetailsModule],
  controllers: [WarningMasterDataController],
  providers: [WarningMasterDataService],
  exports: [WarningMasterDataService],
})
export class WarningMasterDataModule {}