import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  RelationOptions, 
} from 'typeorm';
import { WarningTypeEntity } from '../../warning-types/entities/warning-type.entity';
import { WarningDetailEntity } from '../../warning-details/entities/warning-detail.entity';
import { ActiveStatus } from 'src/database/enumlist';

@Entity('mst_warning_master_data')
export class WarningMasterDataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'warning_type_id' })
  warning_type_id: number;

  @Column({ type: 'int', nullable: true, name: 'validity_period' })
  validity_period: number;

  @Column({ type: 'date', name: 'effective_date' })
  effective_date: string;

  @ManyToOne(() => WarningTypeEntity, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'warning_type_id' })
  warning_type: WarningTypeEntity;

  @OneToMany(
    () => WarningDetailEntity, 
    (detail) => detail.warning_master_data,
    { 
      cascade: true, 
      orphanRemoval: true 
    } as RelationOptions 
  )
  details: WarningDetailEntity[]; 

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