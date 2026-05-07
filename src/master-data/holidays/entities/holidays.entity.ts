import { ActiveStatus } from 'src/database/enumlist';
import { HolidayPeriodsEntity } from 'src/master-data/holiday-periods/entities/holiday-periods.entity';
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

@Entity('mst_holidays')
@Index(['name'])
export class HolidaysEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
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

  @Column({ default: null, nullable: false, name: 'created_by' })
  createdBy: string;

  @Column({ default: null, nullable: false, name: 'updated_by' })
  updatedBy: string;

  @Column({ default: null, select: false, nullable: true, name: 'deleted_by' })
  deletedBy: string;

  @Column({ name: 'periode_id' })
  periodeId: number;
  @ManyToOne(() => HolidayPeriodsEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'periode_id' })
  periode: HolidayPeriodsEntity;
}
