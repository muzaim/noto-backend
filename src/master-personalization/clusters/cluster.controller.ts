import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClustersService } from './cluster.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateClusterDTO } from './dto/create-cluster.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { Audit } from 'src/common/decorators/audit.decorator';
import { UpdateClusterDTO } from './dto/update-cluster.dto';

@ApiTags('Master Personalization - Clusters')
@Controller('/master-personalization/cluster')
export class ClusterController {
  constructor(private readonly clusterService: ClustersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cluster' })
  @ApiResponse({
    status: 201,
    description: 'Cluster created successfully',
  })
  @Audit({
    tableName: 'mst_clusters',
    action: AuditAction.CREATE,
    description: 'Create a new cluster',
  })
  async create(@Body() payload: CreateClusterDTO) {
    const result = await this.clusterService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Cluster created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all clusters' })
  @ApiResponse({
    status: 200,
    description: 'Clusters retrieved successfully',
  })
  @Audit({
    tableName: 'mst_clusters',
    action: AuditAction.VIEW,
    description: 'Retrieve all clusters',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.clusterService.findAll(query, [], null, [
      'name',
      'description',
    ]);
    return {
      status_code: 200,
      message: 'Clusters retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active cluster options' })
  @ApiResponse({
    status: 200,
    description: 'Active cluster options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_clusters',
    action: AuditAction.VIEW,
    description: 'Retrieve active cluster options',
  })
  async findActiveList() {
    const result = await this.clusterService.findActiveList();
    return {
      status_code: 200,
      message: 'Active cluster options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cluster by ID' })
  @ApiResponse({
    status: 200,
    description: 'Cluster retrieved successfully',
  })
  @Audit({
    tableName: 'mst_clusters',
    action: AuditAction.VIEW,
    description: 'Retrieve a cluster by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.clusterService.findOne(id);
    return {
      status_code: 200,
      message: 'Cluster retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cluster by ID' })
  @ApiResponse({
    status: 200,
    description: 'Cluster updated successfully',
  })
  @Audit({
    tableName: 'mst_clusters',
    action: AuditAction.UPDATE,
    description: 'Update a cluster by ID',
  })
  async update(@Param('id') id: number, @Body() payload: UpdateClusterDTO) {
    const result = await this.clusterService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Cluster updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cluster by ID' })
  @ApiResponse({
    status: 200,
    description: 'Cluster deleted successfully',
  })
  @Audit({
    tableName: 'mst_clusters',
    action: AuditAction.DELETE,
    description: 'Delete a cluster by ID',
  })
  async remove(@Param('id') id: number) {
    const result = await this.clusterService.remove(id);
    return {
      status_code: 200,
      message: 'Cluster deleted successfully',
    };
  }
}
