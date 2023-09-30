import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { StaffModule } from './staff/staff.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartProductModule } from './cart_product/cart_product.module';
import { ShippingCompanyModule } from './shipping_company/shipping_company.module';
import { RecipeModule } from './recipe/recipe.module';
import { RecipeIngredientModule } from './recipe_ingredient/recipe_ingredient.module';
import { ShopModule } from './shop/shop.module';
import { RecipeTypeModule } from './recipe_type/recipe_type.module';
import { TypeModule } from './type/type.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceProductModule } from './invoice_product/invoice_product.module';
import { ImportModule } from './import/import.module';
import { ExportModule } from './export/export.module';
import { ImportIngredientModule } from './import_ingredient/import_ingredient.module';
import { ExportIngredientModule } from './export_ingredient/export_ingredient.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ReviewModule } from './review/review.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ProductRecipeModule } from './product_recipe/product_recipe.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot(),
    AuthModule,
    AccountModule,
    StaffModule,
    UserModule,
    ProductModule,
    CartProductModule,
    ShippingCompanyModule,
    RecipeModule,
    RecipeIngredientModule,
    ShopModule,
    RecipeTypeModule,
    TypeModule,
    InvoiceModule,
    InvoiceProductModule,
    ImportModule,
    ExportModule,
    ImportIngredientModule,
    ExportIngredientModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: `${process.env.EXP_IN_ACCESS_TOKEN}` },
    }),
    IngredientModule,
    ReviewModule,
    WishlistModule,
    ProductRecipeModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'n19dccn107@student.ptithcm.edu.vn',
          pass: 'dzwedtbaoqsmrkob',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
