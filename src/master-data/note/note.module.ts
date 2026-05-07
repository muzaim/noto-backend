import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteEntity } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './note.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  providers: [NoteService],
  controllers: [NoteController],
  exports: [NoteService],
})
export class NoteModule {}
