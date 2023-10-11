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
import { CheckExistPhone } from 'src/common/middlewares/middlewares';
import {
  validateLogin,
  validateRegister,
  validateUpdateUser,
} from 'src/common/middlewares/validate';
import { MessageService } from 'src/common/lib';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User, MailerService])],
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
      .apply(validateUpdateUser)
      .forRoutes({ path: 'auth/profile', method: RequestMethod.PATCH });
  }
}
