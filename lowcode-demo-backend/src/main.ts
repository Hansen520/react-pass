/*
 * @Date: 2024-09-23 14:59:21
 * @Description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
