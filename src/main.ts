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
  app.enableCors({
    origin: ['http://tea-z-navy.vercel.app'],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
  });
  app.use(function (request: Request, response: Response, next: NextFunction) {
    response.setHeader(
      'Access-Control-Allow-Origin',
      'http://tea-z-navy.vercel.app',
    );
    next();
  });
  await app.listen(4000);
}
bootstrap();
