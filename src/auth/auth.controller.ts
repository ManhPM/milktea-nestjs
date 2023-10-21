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
  Get,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';
import { v2 as cloudinary } from 'cloudinary';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { MessageService } from 'src/common/lib';
import { ChangePassword } from 'src/user/dto/changepassword.dto';

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
    private readonly messageService: MessageService,
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
      return {
        message: error.message,
      };
    }
  }

  @Get('refresh-token')
  async refreshToken(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const oldToken = req.cookies['refreshToken'];
    const payload = await this.jwtService.verifyAsync(oldToken, {
      secret: process.env.SECRET,
    });
    if (payload) {
      const account = await this.authService.findOne(
        `${payload.account.phone}`,
      );
      const token = await this.jwtService.signAsync({ account });
      const userInfo = {
        phone: '',
        accountId: 1,
        userId: 1,
        role: 0,
        name: '',
        address: '',
        photo: '',
      };
      userInfo.phone = account.phone;
      userInfo.accountId = account.id;
      userInfo.role = account.role;
      if (account.role == 0) {
        userInfo.userId = account.user[0].id;
        userInfo.name = account.user[0].name;
        userInfo.address = account.user[0].address;
        userInfo.photo = account.user[0].photo;
      } else {
        userInfo.userId = account.staff[0].id;
        userInfo.name = account.staff[0].name;
        userInfo.address = account.staff[0].address;
      }
      const refreshToken = await this.jwtService.signAsync({ account });
      const dateToken = new Date();
      dateToken.setHours(dateToken.getHours() + 7);
      dateToken.setDate(dateToken.getDate() + 7);
      const dateRefreshToken = new Date();
      dateRefreshToken.setHours(dateRefreshToken.getHours() + 7);
      dateRefreshToken.setDate(dateRefreshToken.getDate() + 14);
      response
        .cookie('token', token, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          expires: dateToken,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          expires: dateRefreshToken,
        });
      return {
        userInfo: userInfo,
      };
    }
    return null;
  }

  @Post('login')
  async login(
    @Body('phone') phone: string,
    @Body('password') loginPassword: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const account = await this.authService.findOne(`${phone}`);
    if (!(await bcrypt.compare(loginPassword, account.password))) {
      const message = await this.messageService.getMessage('AUTH_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (account.role != 0) {
      if (account.staff.length) {
        if (!account.staff[0].isActive) {
          const message = await this.messageService.getMessage('AUTH_ERROR1');
          throw new HttpException(
            {
              message: message,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }

    const token = await this.jwtService.signAsync({ account });
    const userInfo = {
      phone: '',
      accountId: 1,
      userId: 1,
      role: 0,
      name: '',
      address: '',
      photo: '',
    };
    userInfo.phone = account.phone;
    userInfo.accountId = account.id;
    userInfo.role = account.role;
    if (account.role == 0) {
      userInfo.userId = account.user[0].id;
      userInfo.name = account.user[0].name;
      userInfo.address = account.user[0].address;
      userInfo.photo = account.user[0].photo;
    } else {
      userInfo.userId = account.staff[0].id;
      userInfo.name = account.staff[0].name;
      userInfo.address = account.staff[0].address;
    }
    const refreshToken = await this.jwtService.signAsync({ account });
    const dateToken = new Date();
    dateToken.setHours(dateToken.getHours() + 7);
    dateToken.setDate(dateToken.getDate() + 7);
    const dateRefreshToken = new Date();
    dateRefreshToken.setHours(dateRefreshToken.getHours() + 7);
    dateRefreshToken.setDate(dateRefreshToken.getDate() + 14);
    response
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: dateToken,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: dateRefreshToken,
      });
    const message = await this.messageService.getMessage('LOGIN_SUCCESS');
    return {
      userInfo: userInfo,
      message: message,
    };
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');
    const message = await this.messageService.getMessage('LOGOUT_SUCCESS');
    return {
      message: message,
    };
  }

  @UseGuards(AuthGuard)
  @Post('changepassword')
  async changePassword(
    @Request() req,
    @Body() item: ChangePassword,
  ): Promise<any> {
    return this.authService.changePassword(req, item);
  }

  @Post('forgotpassword')
  async forgotPassword(@Body() item: ChangePassword): Promise<any> {
    return this.authService.forgotPassword(item);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() item: CreateAccountDto): Promise<any> {
    return this.authService.create(item);
  }

  @Post('sms')
  async sendSMS(@Body('phone') phone: string): Promise<any> {
    return this.authService.sendSms(phone);
  }

  @Post('verify')
  async verify(
    @Body('phone') phone: string,
    @Body('verifyID') verifyID: string,
  ): Promise<any> {
    return this.authService.verify(phone, verifyID);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('0')
  @Patch('profile')
  async update(@Request() req, @Body() item: UpdateAccountDto): Promise<any> {
    return this.authService.update(req, item);
  }
}
