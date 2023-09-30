import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ExportService } from './export.service';
import { CreateExportDto } from './dto/create-export.dto';
import { UpdateExportDto } from './dto/update-export.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Post()
  create(@Body() createExportDto: CreateExportDto, @Request() req) {
    return this.exportService.create(createExportDto, req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get()
  findAll() {
    return this.exportService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get('complete/:id')
  completeExport(@Param('id') id: string) {
    return this.exportService.completeExport(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get('ingredient/:id')
  findIngredientExport(@Param('id') id: string) {
    return this.exportService.findIngredientExport(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExportDto: UpdateExportDto) {
    return this.exportService.update(+id, updateExportDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportService.remove(+id);
  }
}
