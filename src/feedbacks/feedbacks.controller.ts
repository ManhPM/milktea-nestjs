import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Khách hàng')
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksService.create(createFeedbackDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Get()
  findAll() {
    return this.feedbacksService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbacksService.update(+id, updateFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(+id);
  }
}
