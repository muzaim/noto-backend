import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDTO } from './dto/create-note.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Master Data - Note')
@Controller('/master-data/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note record' })
  @ApiResponse({
    status: 201,
    description: 'Master data note record created successfully',
  })
  @Audit({
    tableName: 'mst_notes',
    action: AuditAction.CREATE,
    description: 'Create a new note record',
  })
  async create(@Req() req: any, @Body() payload: CreateNoteDTO) {
    const result = await this.noteService.create(
      {
        ...payload,
        user_id: req.user.userId,
      },
      req.user.userId,
    );

    return {
      status_code: 201,
      message: 'Master data note record created successfully',
      result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all note records' })
  @ApiResponse({
    status: 200,
    description: 'Master data note records retrieved successfully',
  })
  @Audit({
    tableName: 'mst_notes',
    action: AuditAction.VIEW,
    description: 'Retrieve all note records',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.noteService.findAll(query, [], null, [
      'name',
      'description',
    ]);
    return {
      status_code: 200,
      message: 'Master data note records retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active religion options' })
  @ApiResponse({
    status: 200,
    description: 'Active religion options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_religions',
    action: AuditAction.VIEW,
    description: 'Retrieve active religion options',
  })
  async findActiveList() {
    const result = await this.noteService.findActiveList();
    return {
      status_code: 200,
      message: 'Active religion options retrieved successfully',
      result: result,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a religion record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data religion record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_religions',
    action: AuditAction.VIEW,
    description: 'Retrieve a religion record by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.noteService.findOne(id);
    return {
      status_code: 200,
      message: 'Master data religion record retrieved successfully',
      result: result,
    };
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a religion record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data religion record updated successfully',
  })
  @Audit({
    tableName: 'mst_religions',
    action: AuditAction.UPDATE,
    description: 'Update a religion record by ID',
  })
  async update(@Param('id') id: number, @Body() payload: CreateNoteDTO) {
    await this.noteService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Master data religion record updated successfully',
    };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a religion record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data religion record deleted successfully',
  })
  @Audit({
    tableName: 'mst_religions',
    action: AuditAction.DELETE,
    description: 'Delete a religion record by ID',
  })
  async remove(@Param('id') id: number) {
    const result = await this.noteService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Master data religion record deleted successfully',
      result: result,
    };
  }
}
