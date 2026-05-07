import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClustersEntity } from './entities/cluster.entity';
import { ClustersService } from './cluster.service';
import { ClusterController } from './cluster.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClustersEntity])],
  providers: [ClustersService],
  controllers: [ClusterController],
  exports: [ClustersService]
})
export class ClustersModule {}
