import { ActiveStatus } from 'src/database/enumlist';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LeaveCategoryEntity } from '../../leave-categories/entities/leave-category.entity';
import { MasterLeaveEntity } from '../../master-leaves/entities/master-leave.entity';

@Entity('mst_leave_types')
export class LeaveTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'leave_days' })
  leave_days: number;

  @ManyToOne(() => MasterLeaveEntity, (master_leave) => master_leave.leave_types, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'master_leave_id' })
  master_leave: MasterLeaveEntity;

  @Column({ name: 'master_leave_id' })
  master_leave_id: number;

  @ManyToOne(() => LeaveCategoryEntity, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'leave_category_id' })
  leave_category: LeaveCategoryEntity;

  @Column({ name: 'leave_category_id' })
  leave_category_id: number;

  @Column({ default: ActiveStatus.Active })
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