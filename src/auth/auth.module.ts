import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { User } from 'src/user/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { LoggerMiddleware } from 'src/common/middlewares/middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User, MailerService])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST }); // áp dụng middleware cho tất cả các route trong 'auth'
  }
}
