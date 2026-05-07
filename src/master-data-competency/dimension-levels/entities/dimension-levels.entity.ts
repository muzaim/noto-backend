import { ActiveStatus } from 'src/database/enumlist';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompetenceDimensionsEntity } from '../../competence-dimensions/entities/competence.dimensions.entity';

@Entity('mst_dimension_levels')
@Index(['level_name', 'description'])
export class DimensionLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'level_name', type: 'varchar', length: 100, nullable: false })
  level_name: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ActiveStatus,
    default: ActiveStatus.Active,
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
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @Column({ default: null, nullable: false, name: 'created_by' })
  createdBy: string;

  @Column({ default: null, nullable: false, name: 'updated_by' })
  updatedBy: string;

  @Column({ default: null, select: false, nullable: true, name: 'deleted_by' })
  deletedBy: string;

  @Column({ name: 'dimension_level_id' })
  dimensionLevelId;
  @ManyToOne(() => CompetenceDimensionsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dimension_level_id' })
  competenceDimension: CompetenceDimensionsEntity;
}
