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
import {
  CheckExistStaff,
  CheckRegisterPhone,
} from 'src/common/middlewares/middlewares';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Account, User])],
  controllers: [StaffController],
  providers: [StaffService, AuthService],
})
export class StaffModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistStaff)
      .forRoutes({ path: 'staff/:id', method: RequestMethod.ALL });
    consumer
      .apply(CheckRegisterPhone)
      .forRoutes({ path: 'staff', method: RequestMethod.POST });
  }
}
