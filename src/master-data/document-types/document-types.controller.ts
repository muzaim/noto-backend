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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DocumentTypesService } from './document-types.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateDocumentTypesDTO } from './dto/create-document-types.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { UpdateDocumentTypesDTO } from './dto/update-document-types.dto';

@ApiTags('Master Data - Document Types')
@Controller('/master-data/document-types')
export class DocumentTypesController {
  constructor(private readonly documentTypesService: DocumentTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new document type record' })
  @ApiResponse({
    status: 201,
    description: 'Master data document type record created successfully',
  })
  @Audit({
    tableName: 'mst_document_types',
    action: AuditAction.CREATE,
    description: 'Create a new document type record',
  })
  async create(@Body() payload: CreateDocumentTypesDTO) {
    const result = await this.documentTypesService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Master data document type record created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all document type records' })
  @ApiResponse({
    status: 200,
    description: 'Master data document type records retrieved successfully',
  })
  @Audit({
    tableName: 'mst_document_types',
    action: AuditAction.VIEW,
    description: 'Retrieve all document type records',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.documentTypesService.findAll(query, [], null, [
      'name',
      'description',
    ]);
    return {
      status_code: 200,
      message: 'Master data document type records retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get document type options' })
  @ApiResponse({
    status: 200,
    description: 'Master data document type options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_document_types',
    action: AuditAction.VIEW,
    description: 'Retrieve document type options',
  })
  async findActiveList() {
    const result = await this.documentTypesService.findActiveList();
    return {
      status_code: 200,
      message: 'Master data document type options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document type record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data document type record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_document_types',
    action: AuditAction.VIEW,
    description: 'Retrieve a document type record by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.documentTypesService.findOne(id);
    return {
      status_code: 200,
      message: 'Master data document type record retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a document type record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data document type record updated successfully',
  })
  @Audit({
    tableName: 'mst_document_types',
    action: AuditAction.UPDATE,
    description: 'Update a document type record by ID',
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateDocumentTypesDTO,
  ) {
    const result = await this.documentTypesService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Master data document type record updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document type record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data document type record deleted successfully',
  })
  @Audit({
    tableName: 'mst_document_types',
    action: AuditAction.DELETE,
    description: 'Delete a document type record by ID',
  })
  async remove(@Param('id') id: number) {
    const result = await this.documentTypesService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Master data document type record deleted successfully',
    };
  }
}
