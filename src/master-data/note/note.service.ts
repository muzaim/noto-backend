import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NoteEntity } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class NoteService extends BaseService<NoteEntity> {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
    protected readonly logger: AppLogger,
  ) {
    super(noteRepository, logger);
    this.logger.setContext(NoteService.name);
  }

  async findByUserId(userId: number) {
    return await this.noteRepository.find({
      where: {
        userId,
      },
      relations: ['blocks'],
      order: {
        id: 'DESC',
      },
    });
  }
}
