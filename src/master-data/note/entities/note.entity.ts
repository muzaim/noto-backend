import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActiveStatus } from 'src/database/enumlist';

@Entity('mst_notes')
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column()
  title: string;

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
