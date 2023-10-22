import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { Shop } from './entities/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validateUpdateShop } from '../common/middlewares/validate';
import { MessageService } from '../common/lib';

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  controllers: [ShopController],
  providers: [ShopService, MessageService],
})
export class ShopModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validateUpdateShop)
      .forRoutes({ path: 'shop', method: RequestMethod.PATCH });
  }
}
