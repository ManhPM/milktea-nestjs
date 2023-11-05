import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParserConfig = require('cookie-parser');
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use((cookieParserConfig as any)());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: ['https://tea-z.vercel.app', 'https://teaz-manage.vercel.app'],
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
