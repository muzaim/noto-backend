import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { WarningMasterDataEntity } from '../../warning-master-data/entities/warning-master-data.entity';
import { PayrollComponentEntity } from '../../payroll-components/entities/payroll-component.entity';
import { ActiveStatus } from 'src/database/enumlist';

@Entity('mst_warning_details')
export class WarningDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'payroll_component_id' })
  payroll_component_id: number;

  @Column({ type: 'int', default: 0, name: 'reduction_percentage' })
  reduction_percentage: number;

  @Column({ name: 'warning_master_data_id' })
  warning_master_data_id: number;

  @ManyToOne(() => WarningMasterDataEntity, (master) => master.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'warning_master_data_id' })
  warning_master_data: WarningMasterDataEntity;

  @ManyToOne(() => PayrollComponentEntity)
  @JoinColumn({ name: 'payroll_component_id' })
  payroll_component: PayrollComponentEntity;

  @Column({ 
      type: 'enum', 
      enum: ActiveStatus, 
      default: ActiveStatus.Active 
    })
     status: ActiveStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false, nullable: true, name: 'deleted_at' })
  deletedAt?: Date;

  @Column({ default: null, nullable: true, name: 'created_by' })
  createdBy: string;

  @Column({ default: null, nullable: true, name: 'updated_by' })
  updatedBy: string;

  @Column({ default: null, select: false, nullable: true, name: 'deleted_by' })
  deletedBy: string;
}