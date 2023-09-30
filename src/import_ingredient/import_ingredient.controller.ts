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
import { ImportIngredientService } from './import_ingredient.service';
import { CreateImportIngredientDto } from './dto/create-import_ingredient.dto';
import { UpdateImportIngredientDto } from './dto/update-import_ingredient.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('import-ingredient')
export class ImportIngredientController {
  constructor(
    private readonly importIngredientService: ImportIngredientService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Post()
  create(@Body() createImportIngredientDto: CreateImportIngredientDto) {
    return this.importIngredientService.create(createImportIngredientDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get()
  findAll() {
    return this.importIngredientService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importIngredientService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImportIngredientDto: UpdateImportIngredientDto,
  ) {
    return this.importIngredientService.update(+id, updateImportIngredientDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2', '1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importIngredientService.remove(+id);
  }
}
