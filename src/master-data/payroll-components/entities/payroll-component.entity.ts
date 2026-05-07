import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ActiveStatus } from 'src/database/enumlist';

@Entity('mst_payroll_components')
export class PayrollComponentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', unique: true })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

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

  @DeleteDateColumn({ 
    type: 'timestamp', 
    select: false, 
    nullable: true, 
    name: 'deleted_at' 
  })
  deletedAt?: Date;

  @Column({ default: null, nullable: true, name: 'created_by' })
  createdBy: string;

  @Column({ default: null, nullable: true, name: 'updated_by' })
  updatedBy: string;

  @Column({ 
    default: null, 
    select: false, 
    nullable: true, 
    name: 'deleted_by' 
  })
  deletedBy: string;
}