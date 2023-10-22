import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.getProfile(req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('2')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Patch('profile')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req, updateUserDto);
  }
}
