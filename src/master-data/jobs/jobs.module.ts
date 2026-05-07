import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobEntity } from "./entities/job.entity";
import { JobsService } from "./jobs.service";
import { JobsController } from "./jobs.controller";

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  providers: [JobsService],
  controllers: [JobsController],
  exports: [JobsService],
})
export class JobsModule {}