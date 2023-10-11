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
import { Account } from 'src/account/entities/account.entity';
import { CheckExistStaff } from 'src/common/middlewares/middlewares';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { MessageService } from 'src/common/lib';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Account, User])],
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
