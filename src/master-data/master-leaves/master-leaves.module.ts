import { Module } from '@nestjs/common';
import { MasterLeavesService } from './master-leaves.service';
import { MasterLeavesController } from './master-leaves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterLeaveEntity } from './entities/master-leave.entity';

@Module({
  controllers: [MasterLeavesController],
  providers: [MasterLeavesService],
  imports: [TypeOrmModule.forFeature([MasterLeaveEntity])],
  exports: [MasterLeavesService],
})
export class MasterLeavesModule {}
