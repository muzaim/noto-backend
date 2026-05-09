import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NoteEntity } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { BaseService } from 'src/common/services/base.service';
import { NoteGateway } from 'src/lib/note.gateway';
import { CreateNoteDTO } from './dto/create-note.dto';
import { AuditTrailService } from 'src/common/services/audit-trail.service';
import { AuditAction } from 'src/common/entities/audit-trail.entity';

@Injectable()
export class NoteService extends BaseService<NoteEntity> {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
    protected readonly logger: AppLogger,
    private readonly noteGateway: NoteGateway,
    private readonly auditTrailService: AuditTrailService,
  ) {
    super(noteRepository, logger);
    this.logger.setContext(NoteService.name);
  }

  async create(
    payload: CreateNoteDTO & {
      userId: number;
    },
    userId: number,
  ) {
    const result = await super.create(payload, userId);

    this.noteGateway.emitNotesUpdate();

    return result;
  }

  async findByUserId(userId: number) {
    return await this.noteRepository.find({
      where: {
        userId,
      },
      relations: ['blocks'],
      order: {
        id: 'DESC',
        blocks: {
          orderIndex: 'ASC',
        },
      },
    });
  }

  async updateNote(id: number, payload: CreateNoteDTO, userId: number) {
    const oldData = await this.noteRepository.findOne({
      where: {
        id,
      },
    });

    await this.noteRepository.update(id, {
      ...payload,

      updatedBy: userId.toString(),
    });

    const newData = await this.noteRepository.findOne({
      where: {
        id,
      },
    });

    this.noteGateway.emitNotesUpdate();

    return {
      id,

      oldData,

      newData,
    };
  }

  async delete(id: number, userId: number) {
    const note = await this.noteRepository.findOne({
      where: {
        id,
      },
    });

    await this.noteRepository.update(id, {
      deletedBy: userId.toString(),
    });

    await this.noteRepository.softDelete(id);

    this.noteGateway.emitNotesUpdate();

    return note;
  }

  async getAuditTrail(userId: number) {
    const result = await this.auditTrailService.findByUser(userId, 1, 999999);

    return {
      ...result,

      data: result.data
        .filter((item) =>
          [AuditAction.CREATE, AuditAction.UPDATE, AuditAction.DELETE].includes(
            item.action,
          ),
        )
        .map((item) => ({
          ...item,

          description: `${item.user?.name ?? 'User'} ${item.description.toLowerCase()}`,

          user: undefined,
        })),
    };
  }
}
