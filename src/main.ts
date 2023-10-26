import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParserConfig = require('cookie-parser');
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use((cookieParserConfig as any)());
  app.setGlobalPrefix('api/v1');
  const corsOptions = {
    origin: process.env.ENV === 'dev' ? true : 'https://tea-z.vercel.app/',
    credentials: true,
  };
  app.use(cors(corsOptions));
  await app.listen(4000);
}
bootstrap();
