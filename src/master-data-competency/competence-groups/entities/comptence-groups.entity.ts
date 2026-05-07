import { ActiveStatus } from 'src/database/enumlist';
import { CompetenceDimensionsEntity } from 'src/master-data-competency/competence-dimensions/entities/competence.dimensions.entity';
import { CompetenceTypesEntity } from 'src/master-data-competency/competence-types/entities/competence-types.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mst_competence_groups')
@Index(['name'])
export class CompetenceGroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'code', type: 'varchar', length: 10, nullable: false })
  code: string;

  @Column({ name: 'definition', type: 'text' })
  definition: string;

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

  @Column({ name: 'competence_type_id' })
  competenceTypeId: number;
  @ManyToOne(() => CompetenceTypesEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'competence_type_id' })
  competenceType: CompetenceTypesEntity;

  @OneToMany(
    () => CompetenceDimensionsEntity,
    (dimension) => dimension.competenceGroup,
  )
  competenceDimension: CompetenceDimensionsEntity[];
}
