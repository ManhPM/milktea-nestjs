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
    origin:
      process.env.ENV === 'dev'
        ? true
        : 'https://tea-j8zxy0h2a-th1nh2411.vercel.app/',
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
