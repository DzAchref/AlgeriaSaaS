import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/delivery');
  await app.listen(4008);
  console.log('S8 API is running on port 4008');
}
bootstrap();
