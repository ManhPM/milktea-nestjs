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
import { InvoiceProductService } from './invoice_product.service';
import { CreateInvoiceProductDto } from './dto/create-invoice_product.dto';
import { UpdateInvoiceProductDto } from './dto/update-invoice_product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('invoice-product')
export class InvoiceProductController {
  constructor(private readonly invoiceProductService: InvoiceProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createInvoiceProductDto: CreateInvoiceProductDto) {
    return this.invoiceProductService.create(createInvoiceProductDto);
  }

  // @UseGuards(AuthGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.invoiceProductService.findAll(+id);
  }

  // @UseGuards(AuthGuard)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.invoiceProductService.findOne(+id);
  // }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvoiceProductDto: UpdateInvoiceProductDto,
  ) {
    return this.invoiceProductService.update(+id, updateInvoiceProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceProductService.remove(+id);
  }
}
