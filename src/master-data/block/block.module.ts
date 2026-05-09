import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlcokEntity } from './entities/block.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockController } from './block.controller';
import { NoteGateway } from 'src/lib/note.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([BlcokEntity])],
  providers: [BlockService, NoteGateway],
  controllers: [BlockController],
  exports: [BlockService],
})
export class BlcokModule {}
