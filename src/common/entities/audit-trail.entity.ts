import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  VIEW = 'VIEW',
  EXPORT = 'EXPORT',
  IMPORT = 'IMPORT',
  DOWNLOAD = 'DOWNLOAD',
}

@Entity('audit_trail')
@Index(['user_id', 'created_at'])
@Index(['table_name', 'record_id'])
@Index(['action'])
export class AuditTrail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @Column({ nullable: true })
  user_id: number;

  @Column({ length: 100, nullable: true })
  username: string;

  @Column({ length: 100 })
  table_name: string;

  @Column({ nullable: true })
  record_id: number;

  @Column({
    type: 'enum',
    enum: AuditAction,
  })
  action: AuditAction;

  @Column({ type: 'text', nullable: true })
  old_values: string;

  @Column({ type: 'text', nullable: true })
  new_values: string;

  @Column({ length: 45, nullable: true })
  ip_address: string;

  @Column({ type: 'text', nullable: true })
  user_agent: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
