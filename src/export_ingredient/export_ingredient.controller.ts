import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExportIngredientService } from './export_ingredient.service';
import { CreateExportIngredientDto } from './dto/create-export_ingredient.dto';
import { UpdateExportIngredientDto } from './dto/update-export_ingredient.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('export-ingredient')
export class ExportIngredientController {
  constructor(
    private readonly exportIngredientService: ExportIngredientService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Post()
  create(@Body() createExportIngredientDto: CreateExportIngredientDto) {
    return this.exportIngredientService.create(createExportIngredientDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get()
  findAll() {
    return this.exportIngredientService.findAll();
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportIngredientService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExportIngredientDto: UpdateExportIngredientDto,
  ) {
    return this.exportIngredientService.update(+id, updateExportIngredientDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportIngredientService.remove(+id);
  }
}
