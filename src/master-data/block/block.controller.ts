import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { ReorderBlockDto } from './dto/reoder-block.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Master Data - block')
@Controller('/master-data/block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new block record' })
  @ApiResponse({
    status: 201,
    description: 'Master data block record created successfully',
  })
  @Audit({
    tableName: 'mst_blocks',
    action: AuditAction.CREATE,
    description: 'Create a new block record',
  })
  async create(@Req() req: RequestWithUser, @Body() payload: CreateBlockDto) {
    const result = await this.blockService.create(
      {
        ...payload,
        userId: req.user.userId,
      },
      req.user.userId,
    );

    return {
      status_code: 201,
      message: 'Master data block record created successfully',
      result,
    };
  }

  @Get('/note/:id')
  @ApiOperation({ summary: 'Get blocks by note ID' })
  @ApiResponse({
    status: 200,
    description: 'Block records retrieved successfully',
  })
  async findByNoteId(@Param('id') noteId: number) {
    const result = await this.blockService.findByNoteId(Number(noteId));

    return {
      status_code: 200,
      message: 'Block records retrieved successfully',
      result,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a block record' })
  @ApiResponse({
    status: 200,
    description: 'Master data block record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_blocks',
    action: AuditAction.VIEW,
    description: 'Retrieve a block record',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.blockService.findOne(id);
    return {
      status_code: 200,
      message: 'Master data block record retrieved successfully',
      result: result,
    };
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a block record' })
  @ApiResponse({
    status: 200,
    description: 'Master data block record updated successfully',
  })
  @Audit({
    tableName: 'mst_blocks',
    action: AuditAction.UPDATE,
    description: 'Update a block record',
  })
  async update(@Param('id') id: number, @Body() payload: CreateBlockDto) {
    await this.blockService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Master data block record updated successfully',
    };
  }

  @Patch('/reorder')
  @ApiOperation({ summary: 'Reorder block records' })
  @ApiResponse({
    status: 200,
    description: 'Block records reordered successfully',
  })
  @Audit({
    tableName: 'mst_blocks',
    action: AuditAction.UPDATE,
    description: 'Reorder block records',
  })
  async reorder(@Body() payload: ReorderBlockDto) {
    const result = await this.blockService.reorder(payload);

    return {
      status_code: 200,
      message: 'Block records reordered successfully',
      result,
    };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a block record' })
  @ApiResponse({
    status: 200,
    description: 'Master data block record deleted successfully',
  })
  @Audit({
    tableName: 'mst_blocks',
    action: AuditAction.DELETE,
    description: 'Delete a block record',
  })
  async remove(@Param('id') id: number) {
    const result = await this.blockService.delete(id, 1);
    return {
      status_code: 200,
      message: 'Master data block record deleted successfully',
      result: result,
    };
  }
}
