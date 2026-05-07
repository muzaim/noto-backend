import { Module } from '@nestjs/common';
import { LeaveTypesService } from './leave-types.service';
import { LeaveTypesController } from './leave-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveTypeEntity } from './entities/leave-type.entity';

@Module({
  controllers: [LeaveTypesController],
  providers: [LeaveTypesService],
  imports: [TypeOrmModule.forFeature([LeaveTypeEntity])],
  exports: [LeaveTypesService],
})
export class LeaveTypesModule {}
