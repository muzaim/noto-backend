import { ActiveStatus } from 'src/database/enumlist';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LeaveTypeEntity } from '../../leave-types/entities/leave-type.entity';

@Entity('mst_master_leaves')
export class MasterLeaveEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'int', name: 'year' })
  year: number;

  @Column({ type: 'int', name: 'block_leave' })
  block_leave: number;

  @OneToMany(() => LeaveTypeEntity, (leave_type) => leave_type.master_leave)
  leave_types: LeaveTypeEntity[];

  leave_types_count?: number;

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