import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDTO } from './dto/create-note.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

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
  async create(@Req() req: RequestWithUser, @Body() payload: CreateNoteDTO) {
    const result = await this.noteService.create(
      {
        ...payload,
        userId: req.user.userId,
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
  async findAll(@Req() req: RequestWithUser) {
    const result = await this.noteService.findByUserId(req.user.userId);

    return {
      status_code: 200,
      message: 'Master data note records retrieved successfully',
      result,
    };
  }

  @Get('/audit-trail')
  async getAuditTrail(@Req() req: RequestWithUser) {
    console.log(req.user);
    return this.noteService.getAuditTrail(req.user.userId);
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active note options' })
  @ApiResponse({
    status: 200,
    description: 'Active note options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_notes',
    action: AuditAction.VIEW,
    description: 'Retrieve active note options',
  })
  async findActiveList() {
    const result = await this.noteService.findActiveList();
    return {
      status_code: 200,
      message: 'Active note options retrieved successfully',
      result: result,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a note record' })
  @ApiResponse({
    status: 200,
    description: 'Master data note record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_notes',
    action: AuditAction.VIEW,
    description: 'Retrieve a note record',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.noteService.findOne(id);
    return {
      status_code: 200,
      message: 'Master data note record retrieved successfully',
      result: result,
    };
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update a note record',
  })
  @ApiResponse({
    status: 200,
    description: 'Master data note record updated successfully',
  })
  @Audit({
    tableName: 'mst_notes',
    action: AuditAction.UPDATE,
    description: 'Update a note record',
  })
  async update(
    @Param('id') id: number,

    @Body()
    payload: CreateNoteDTO,
  ) {
    const result = await this.noteService.updateNote(id, payload, 1);

    return {
      status_code: 200,

      message: 'Master data note record updated successfully',

      result,
    };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a note record' })
  @ApiResponse({
    status: 200,
    description: 'Master data note record deleted successfully',
  })
  @Audit({
    tableName: 'mst_notes',
    action: AuditAction.DELETE,
    description: 'Delete a note record',
  })
  async remove(@Param('id') id: number) {
    const result = await this.noteService.delete(id, 1);
    return {
      status_code: 200,
      message: 'Master data note record deleted successfully',
      result: result,
    };
  }
}
