import {
  validateCreateStaff,
  validateUpdateStaff,
} from './../common/middlewares/validate';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { Staff } from './entities/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/entities/account.entity';
import { CheckExistStaff } from '../common/middlewares/middlewares';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/entities/user.entity';
import { MessageService } from '../common/lib';
import { Verify } from '../verify/entities/verify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Account, User, Verify])],
  controllers: [StaffController],
  providers: [StaffService, AuthService, MessageService],
})
export class StaffModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistStaff)
      .forRoutes({ path: 'staff/:id', method: RequestMethod.ALL });
    consumer
      .apply(validateCreateStaff)
      .forRoutes({ path: 'staff', method: RequestMethod.POST });
    consumer
      .apply(validateUpdateStaff)
      .forRoutes({ path: 'staff', method: RequestMethod.PATCH });
  }
}
