import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import {
  Body,
  Controller,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';
import { v2 as cloudinary } from 'cloudinary';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

cloudinary.config({
  cloud_name: 'dgsumh8ih',
  api_key: '726416339718441',
  api_secret: 'n9z2-8LwGN8MPhbDadWYuMGN78U',
});

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('upload')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0', '2')
  @UseInterceptors(FileInterceptor('my_file'))
  async uploadFile(@UploadedFile() file) {
    try {
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
      const cldRes = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
      });
      return {
        url: cldRes.url,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
      };
    }
  }

  @Post('login')
  async login(
    @Body('phone') phone: string,
    @Body('password') loginPassword: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const account = await this.authService.findOne(`${phone}`);

    if (!account) {
      throw new HttpException(
        {
          message: 'Sai thông tin đăng nhập',
        },
        401,
      );
    }

    if (!(await bcrypt.compare(loginPassword, account.password))) {
      throw new HttpException(
        {
          message: 'Sai thông tin đăng nhập',
        },
        401,
      );
    }

    if (account.role != 0) {
      if (!account.staff[0].isActive) {
        throw new HttpException(
          {
            message:
              'Bạn đã nghỉ việc tại hệ thống của chúng tôi, không thể đăng nhập',
          },
          400,
        );
      }
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
