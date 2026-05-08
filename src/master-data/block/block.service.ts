import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlcokEntity } from './entities/block.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { BaseService } from 'src/common/services/base.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { ReorderBlockDto } from './dto/reoder-block.dto';

@Injectable()
export class BlockService extends BaseService<BlcokEntity> {
  constructor(
    @InjectRepository(BlcokEntity)
    private readonly blockRepository: Repository<BlcokEntity>,
    protected readonly logger: AppLogger,
  ) {
    super(blockRepository, logger);
    this.logger.setContext(BlockService.name);
  }

  async create(payload: CreateBlockDto & { userId: number }, userId: number) {
    const lastBlock = await this.blockRepository.findOne({
      where: {
        noteId: payload.noteId,
      },
      order: {
        orderIndex: 'DESC',
      },
    });

    const orderIndex = lastBlock ? lastBlock.orderIndex + 1 : 0;

    return await super.create(
      {
        ...payload,
        parentId: null,
        orderIndex,
      },
      userId,
    );
  }

  async findByNoteId(noteId: number) {
    return await this.blockRepository.find({
      where: {
        noteId,
      },
      relations: ['note', 'parent', 'children', 'user'],
      order: {
        orderIndex: 'ASC',
      },
    });
  }

  async reorder(payload: ReorderBlockDto) {
    for (const item of payload.items) {
      await this.blockRepository.update(item.id, {
        orderIndex: item.orderIndex,
      });
    }

    return true;
  }
}
