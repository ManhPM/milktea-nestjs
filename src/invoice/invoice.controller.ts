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
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { FilterInvoiceDto } from './dto/filter-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: FilterInvoiceDto) {
    return this.invoiceService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Get('/current/get')
  getCurrent(@Request() req) {
    return this.invoiceService.getCurrentInvoice(req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('1', '2')
  @Get('/confirm/:id')
  confirm(@Param('id') id: number, @Request() req) {
    return this.invoiceService.confirmInvoice(id, req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('1')
  @Get('/confirm/:id')
  receive(@Param('id') id: number) {
    return this.invoiceService.receiveInvoice(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('1', '2')
  @Get('/confirm/:id')
  cancel(@Param('id') id: number) {
    return this.invoiceService.cancelInvoice(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('1', '2')
  @Get('/confirm/:id')
  complete(@Param('id') id: number) {
    return this.invoiceService.completeInvoice(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
