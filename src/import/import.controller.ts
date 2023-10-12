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
import { ImportService } from './import.service';
import { CreateImportDto } from './dto/create-import.dto';
import { UpdateImportDto } from './dto/update-import.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateImportIngredientDto } from 'src/import_ingredient/dto/create-import_ingredient.dto';
import { UpdateImportIngredientDto } from 'src/import_ingredient/dto/update-import_ingredient.dto';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Post()
  create(@Body() createImportDto: CreateImportDto, @Request() req) {
    return this.importService.create(createImportDto, req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Post('ingredient')
  createIngredientImport(@Body() createImportDto: CreateImportIngredientDto) {
    return this.importService.createIngredientImport(createImportDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Delete('ingredient')
  deleteIngredientImport(@Body() item: UpdateImportIngredientDto) {
    return this.importService.deleteIngredientImport(item);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get()
  findAll() {
    return this.importService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get('/ingredient/:id')
  findIngredientImport(@Param('id') id: number) {
    return this.importService.findIngredientImport(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get('/complete/:id')
  completeImport(@Param('id') id: number) {
    return this.importService.completeImport(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImportDto: UpdateImportDto) {
    return this.importService.update(+id, updateImportDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importService.remove(+id);
  }
}
