import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/booking');
  await app.listen(4007);
  console.log('S7 API is running on port 4007');
}
bootstrap();
