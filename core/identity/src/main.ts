import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/v1/identity');

  const port = process.env.IDENTITY_PORT || 3002;
  await app.listen(port);
  console.log(`Identity & Auth Service is running on: http://localhost:${port}`);
}
bootstrap();
