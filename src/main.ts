import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParserConfig = require('cookie-parser');
import { ValidationPipe } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use((cookieParserConfig as any)());
  app.setGlobalPrefix('api/v1');
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);
  await app.listen(4000);
}
bootstrap();
