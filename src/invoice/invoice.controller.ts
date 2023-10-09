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
  Ip,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { FilterInvoiceDto } from './dto/filter-invoice.dto';
import { RefundPaymentDto } from './dto/refund-invoice.dto';
import { ThongKeDto } from './dto/thongke-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Post('checkout')
  create(@Body() createInvoiceDto: CreateInvoiceDto, @Request() req) {
    return this.invoiceService.checkout(createInvoiceDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: FilterInvoiceDto, @Request() req) {
    return this.invoiceService.findAll(query, req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @UseGuards(AuthGuard)
  @Post('statistical')
  statistical(@Body() item: ThongKeDto) {
    return this.invoiceService.thongKe(item);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Post('/payment')
  handlePayment(@Body('id_order') id_order: number, @Ip() ip) {
    return this.invoiceService.handlePayment(id_order, ip);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('1', '2')
  @UseGuards(AuthGuard)
  @Post('/refund')
  handleRefund(@Body('id_order') id_order: number, @Ip() ip) {
    return this.invoiceService.handleRefund(id_order, ip);
  }

  @Get('/payment/return')
  handleAccessPayment(@Query() vnp_Params: any) {
    return this.invoiceService.handlePaymentReturn(vnp_Params);
  }

  @Get('/refund/return')
  handleRefundReturn(@Query() vnp_Params: any) {
    return this.invoiceService.handleRefundReturn(vnp_Params);
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
  @Roles('1', '2')
  @Get('/receive/:id')
  receive(@Param('id') id: number) {
    return this.invoiceService.receiveInvoice(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('1', '2')
  @Get('/cancel/:id')
  cancel(@Param('id') id: number, @Request() req) {
    return this.invoiceService.cancelInvoice(id, req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('1', '2')
  @Get('/complete/:id')
  complete(@Param('id') id: number) {
    return this.invoiceService.completeInvoice(id);
  }
}
