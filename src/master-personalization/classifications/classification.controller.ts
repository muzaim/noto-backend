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
import { ClassificationsService } from './classification.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateClassificationDTO } from './dto/create-classification.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { Audit } from 'src/common/decorators/audit.decorator';
import { UpdateClassificationDTO } from './dto/update-classification.dto';

@ApiTags('Master Personalization - Classifications')
@Controller('/master-personalization/classification')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new classification' })
  @ApiResponse({
    status: 201,
    description: 'Classification created successfully',
  })
  @Audit({
    tableName: 'mst_classifications',
    action: AuditAction.CREATE,
    description: 'Create a new classification',
  })
  async create(@Body() payload: CreateClassificationDTO) {
    const result = await this.classificationService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Classification created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all classifications' })
  @ApiResponse({
    status: 200,
    description: 'Classifications retrieved successfully',
  })
  @Audit({
    tableName: 'mst_classifications',
    action: AuditAction.VIEW,
    description: 'Retrieve all classifications',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.classificationService.findAll(query, [], null, [
      'name',
    ]);
    return {
      status_code: 200,
      message: 'Classifications retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active classification options' })
  @ApiResponse({
    status: 200,
    description: 'Active classification options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_classifications',
    action: AuditAction.VIEW,
    description: 'Retrieve active classification options',
  })
  async findActiveList() {
    const result = await this.classificationService.findActiveList();
    return {
      status_code: 200,
      message: 'Active classification options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a classification by ID' })
  @ApiResponse({
    status: 200,
    description: 'Classification retrieved successfully',
  })
  @Audit({
    tableName: 'mst_classifications',
    action: AuditAction.VIEW,
    description: 'Retrieve a classification by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.classificationService.findOne(id);
    return {
      status_code: 200,
      message: 'Classification retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a classification by ID' })
  @ApiResponse({
    status: 200,
    description: 'Classification updated successfully',
  })
  @Audit({
    tableName: 'mst_classifications',
    action: AuditAction.UPDATE,
    description: 'Update a classification by ID',
  })
  async update(@Param('id') id: number, @Body() payload: UpdateClassificationDTO) {
    const result = await this.classificationService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Classification updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a classification by ID' })
  @ApiResponse({
    status: 200,
    description: 'Classification deleted successfully',
  })
  @Audit({
    tableName: 'mst_classifications',
    action: AuditAction.DELETE,
    description: 'Delete a classification by ID',
  })
  async remove(@Param('id') id: number) {
    const result = await this.classificationService.remove(id);
    return {
      status_code: 200,
      message: 'Classification deleted successfully',
    };
  }
}