import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/crm');
  await app.listen(4006);
  console.log('S6 API is running on port 4006');
}
bootstrap();
