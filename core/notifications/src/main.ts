import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/v1/notifications');

  const port = process.env.NOTIFICATION_HUB_PORT || 3003;
  await app.listen(port);
  console.log(`Notification Hub Service is running on: http://localhost:${port}`);
}
bootstrap();
