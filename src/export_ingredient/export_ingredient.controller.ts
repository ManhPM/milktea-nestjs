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
}
