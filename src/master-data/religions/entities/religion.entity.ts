import { ActiveStatus } from 'src/database/enumlist';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
  Index,
} from 'typeorm';

@Entity('mst_religions')
@Unique(['name'])
@Index(['name'])
export class ReligionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: ActiveStatus.Active })
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

  @Column({ default: null, nullable: true, name: 'created_by' })
  createdBy: string;

  @Column({ default: null, nullable: true, name: 'updated_by' })
  updatedBy: string;

  @Column({ default: null, select: true, nullable: true, name: 'deleted_by' })
  deletedBy: string;
}
