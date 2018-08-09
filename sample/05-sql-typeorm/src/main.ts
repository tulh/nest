import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import {LoggingInterceptor} from "./logging.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3001);
}
bootstrap();
