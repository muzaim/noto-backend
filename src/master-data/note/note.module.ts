import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteEntity } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './note.controller';
import { NoteGateway } from 'src/lib/note.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  providers: [NoteService, NoteGateway],
  controllers: [NoteController],
  exports: [NoteService],
})
export class NoteModule {}
