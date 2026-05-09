import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NoteEntity } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { BaseService } from 'src/common/services/base.service';
import { NoteGateway } from 'src/lib/note.gateway';
import { CreateNoteDTO } from './dto/create-note.dto';

@Injectable()
export class NoteService extends BaseService<NoteEntity> {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
    protected readonly logger: AppLogger,
    private readonly noteGateway: NoteGateway,
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

  async delete(id: number, userId: number) {
    await this.noteRepository.update(id, {
      deletedBy: userId.toString(),
    });

    await this.noteRepository.softDelete(id);

    this.noteGateway.emitNotesUpdate();

    return true;
  }
}
