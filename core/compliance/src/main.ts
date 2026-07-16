import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/v1/compliance');

  const port = process.env.COMPLIANCE_ENGINE_PORT || 3004;
  await app.listen(port);
  console.log(`Compliance Engine Service is running on: http://localhost:${port}`);
}
bootstrap();
