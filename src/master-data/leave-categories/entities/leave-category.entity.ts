import { ActiveStatus } from 'src/database/enumlist';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('mst_leave_categories')
export class LeaveCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: 'leave_type' })
  leave_type: string;

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