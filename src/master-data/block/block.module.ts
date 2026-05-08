import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlcokEntity } from './entities/block.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockController } from './block.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BlcokEntity])],
  providers: [BlockService],
  controllers: [BlockController],
  exports: [BlockService],
})
export class BlcokModule {}
