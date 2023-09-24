import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') loginPassword: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.findOne(`${username}`);

    if (!user) {
      throw new BadRequestException('Sai thông tin đăng nhập');
    }

    if (!(await bcrypt.compare(loginPassword, user.password))) {
      throw new BadRequestException('Sai thông tin đăng nhập');
    }

    delete user.password;

    const token = await this.jwtService.signAsync({ userInfo: user });

    response.cookie('token', token, {
      httpOnly: true,
      sameSite: process.env.ENV === 'dev' ? true : 'none',
      secure: process.env.ENV === 'dev' ? false : true,
    });

    return {
      userInfo: user,
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
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.create(createUserDto);
  }
}
