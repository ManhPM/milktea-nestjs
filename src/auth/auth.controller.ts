import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Body,
  Controller,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body('phone') phone: string,
    @Body('password') loginPassword: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const account = await this.authService.findOne(`${phone}`);

    if (!account) {
      throw new BadRequestException('Sai thông tin đăng nhập');
    }

    if (!(await bcrypt.compare(loginPassword, account.password))) {
      throw new BadRequestException('Sai thông tin đăng nhập');
    }

    delete account.password;

    const token = await this.jwtService.signAsync({ account });

    response.cookie('token', token, {
      httpOnly: true,
      sameSite: process.env.ENV === 'dev' ? true : 'none',
      secure: process.env.ENV === 'dev' ? false : true,
    });

    return {
      userInfo: account,
      message: 'Login success',
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');

    return {
      message: 'Logout success',
    };
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() item: CreateAccountDto): Promise<any> {
    return this.authService.create(item);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async update(@Body() item: UpdateAccountDto): Promise<any> {
    return this.authService.create(item);
  }
}
