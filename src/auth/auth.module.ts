import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/entities/account.entity';
import { User } from '../user/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { CheckExistPhone } from '../common/middlewares/middlewares';
import {
  validateChangePassword,
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateUpdateUser,
} from '../common/middlewares/validate';
import { MessageService } from '../common/lib';
import { Verify } from '../verify/entities/verify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User, MailerService, Verify])],
  controllers: [AuthController],
  providers: [AuthService, MessageService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validateLogin, CheckExistPhone)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
    consumer
      .apply(validateRegister)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
    consumer
      .apply(validateChangePassword)
      .forRoutes({ path: 'auth/changepassword', method: RequestMethod.POST });
    consumer
      .apply(CheckExistPhone, validateForgotPassword)
      .forRoutes({ path: 'auth/forgotpassword', method: RequestMethod.POST });
    consumer
      .apply(validateUpdateUser)
      .forRoutes({ path: 'auth/profile', method: RequestMethod.PATCH });
  }
}
