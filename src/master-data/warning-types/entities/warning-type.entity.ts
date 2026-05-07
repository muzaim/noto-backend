import { ActiveStatus } from 'src/database/enumlist';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('mst_warning_types')
export class WarningTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'warning_type', length: 255 })
  warning_type: string;

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