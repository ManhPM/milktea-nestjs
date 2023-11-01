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
    origin: ['https://tea-z-navy.vercel.app'],
    methods: ['GET', 'POST', 'HEAD', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    credentials: true,
  });
  app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});
  await app.listen(4000);
}
bootstrap();
