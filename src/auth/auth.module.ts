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
import {
  CheckExistPhone,
  CheckRegisterPhone,
} from 'src/common/middlewares/middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User, MailerService])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistPhone)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
    consumer
      .apply(CheckRegisterPhone)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
  }
}
