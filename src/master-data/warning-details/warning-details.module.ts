import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarningDetailsService } from './warning-details.service';
import { WarningDetailsController } from './warning-details.controller';
import { WarningDetailEntity } from './entities/warning-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarningDetailEntity])],
  controllers: [WarningDetailsController],
  providers: [WarningDetailsService],
  exports: [WarningDetailsService],
})
export class WarningDetailsModule {}