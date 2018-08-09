import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import {join} from "path";

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.setGlobalPrefix('v1');
    await app.listen(3001);
}

bootstrap();
