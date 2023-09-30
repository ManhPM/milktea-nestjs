import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { User } from 'src/user/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User, MailerService])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
