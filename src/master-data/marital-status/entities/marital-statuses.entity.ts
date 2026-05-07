import { ActiveStatus } from 'src/database/enumlist';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('mst_marital_statuses')
@Index(['name'])
export class MaritalStatusesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'enum', default: ActiveStatus.Active, enum: ActiveStatus })
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
}
