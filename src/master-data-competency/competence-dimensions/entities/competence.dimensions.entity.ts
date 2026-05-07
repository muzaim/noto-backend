import { ActiveStatus } from 'src/database/enumlist';
import { CompetenceGroupsEntity } from 'src/master-data-competency/competence-groups/entities/comptence-groups.entity';
import { DimensionLevelEntity } from 'src/master-data-competency/dimension-levels/entities/dimension-levels.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mst_competence_dimensions')
export class CompetenceDimensionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

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

  @Column({ name: 'competence_group_id' })
  competenceGroupId: number;
  @ManyToOne(() => CompetenceGroupsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'competence_group_id' })
  competenceGroup: CompetenceGroupsEntity;

  @OneToMany(() => DimensionLevelEntity, (levels) => levels.competenceDimension)
  dimensionLevels: DimensionLevelEntity;
}
