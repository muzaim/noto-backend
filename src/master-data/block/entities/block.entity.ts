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
import { ActiveStatus } from 'src/database/enumlist';
import { NoteEntity } from 'src/master-data/note/entities/note.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsBoolean, IsOptional } from 'class-validator';

export enum BlockType {
  TEXT = 'text',
  CHECKLIST = 'checklist',
  IMAGE = 'image',
  CODE = 'code',
}

@Entity('mst_blocks')
export class BlcokEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'note_id',
  })
  noteId: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => NoteEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'note_id' })
  note: NoteEntity;

  @IsOptional()
  @IsBoolean()
  checked?: boolean;

  @Column({
    name: 'parent_id',
    nullable: true,
  })
  parentId?: number;

  @ManyToOne(() => BlcokEntity, (block) => block.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: BlcokEntity;

  @OneToMany(() => BlcokEntity, (block) => block.parent)
  children?: BlcokEntity[];

  @Column({
    type: 'enum',
    enum: BlockType,
  })
  type: BlockType;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    name: 'order_index',
    default: 0,
  })
  orderIndex: number;

  @Column({ default: ActiveStatus.Active })
  status: ActiveStatus;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    select: false,
    nullable: true,
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @Column({
    default: null,
    nullable: true,
    name: 'created_by',
  })
  createdBy: string;

  @Column({
    default: null,
    nullable: true,
    name: 'updated_by',
  })
  updatedBy: string;

  @Column({
    default: null,
    nullable: true,
    select: true,
    name: 'deleted_by',
  })
  deletedBy: string;
}
