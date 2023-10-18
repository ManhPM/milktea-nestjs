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
  Query,
} from '@nestjs/common';
import { ExportService } from './export.service';
import { CreateExportDto } from './dto/create-export.dto';
import { UpdateExportDto } from './dto/update-export.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateExportIngredientDto } from 'src/export_ingredient/dto/create-export_ingredient.dto';
import { UpdateExportIngredientDto } from 'src/export_ingredient/dto/update-export_ingredient.dto';

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
  @Post('ingredient')
  createIngredientExport(@Body() createExportDto: CreateExportIngredientDto) {
    return this.exportService.createIngredientExport(createExportDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Delete('ingredient')
  deleteIngredientExport(@Body() item: UpdateExportIngredientDto) {
    return this.exportService.deleteIngredientExport(item);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get()
  findAll(@Query() query) {
    return this.exportService.findAll(query);
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
