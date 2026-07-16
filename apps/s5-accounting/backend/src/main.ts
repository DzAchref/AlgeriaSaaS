import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/accounting');
  await app.listen(4005);
  console.log('S5 API is running on port 4005');
}
bootstrap();
