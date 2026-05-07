import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollComponentsService } from './payroll-components.service';
import { PayrollComponentsController } from './payroll-components.controller';
import { PayrollComponentEntity } from './entities/payroll-component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PayrollComponentEntity])],
  controllers: [PayrollComponentsController],
  providers: [PayrollComponentsService],
  exports: [PayrollComponentsService],
})
export class PayrollComponentsModule {}