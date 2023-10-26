import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParserConfig = require('cookie-parser');
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use((cookieParserConfig as any)());
  app.setGlobalPrefix('api/v1');
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.enableCors({
    origin: process.env.ENV === 'dev' ? true : ['https://tea-z.vercel.app/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
