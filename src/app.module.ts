import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tours.module';
import { BookingsModule } from './bookings/bookings.module';
import { CouponsModule } from './coupons/coupons.module';
import { GuidesModule } from './guides/guides.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';
import { PaymentsModule } from './payments/payments.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { UserCouponsModule } from './user_coupons/user_coupons.module';
import { RolesModule } from './roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    ToursModule,
    BookingsModule,
    CouponsModule,
    GuidesModule,
    ReviewsModule,
    CategoriesModule,
    PaymentsModule,
    FeedbacksModule,
    WishlistsModule,
    ConfigModule.forRoot(),
    UserCouponsModule,
    RolesModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: `${process.env.EXP_IN_ACCESS_TOKEN}` },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
