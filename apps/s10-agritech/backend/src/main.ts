import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/agritech');
  await app.listen(4010);
  console.log('S10 API is running on port 4010');
}
bootstrap();
