import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { Type } from './entities/type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CheckCreateType,
  CheckExistType,
} from 'src/common/middlewares/middlewares';
import { MessageService } from 'src/common/lib';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypeController],
  providers: [TypeService, MessageService],
})
export class TypeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistType)
      .forRoutes({ path: 'type/:id', method: RequestMethod.ALL });
    consumer
      .apply(CheckCreateType)
      .forRoutes({ path: 'type', method: RequestMethod.POST });
  }
}
