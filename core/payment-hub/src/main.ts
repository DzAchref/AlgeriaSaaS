import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/v1/payments');

  const port = process.env.PAYMENT_HUB_PORT || 3001;
  await app.listen(port);
  console.log(`Payment Hub Service is running on: http://localhost:${port}`);
}
bootstrap();
