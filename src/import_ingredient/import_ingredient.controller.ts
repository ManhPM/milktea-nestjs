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
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('import-ingredient')
export class ImportIngredientController {
  constructor(
    private readonly importIngredientService: ImportIngredientService,
  ) {}
}
