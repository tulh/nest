import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PhotoModule} from './photo/photo.module';
import {APP_INTERCEPTOR} from "@nestjs/core";
import {LoggingInterceptor} from "./logging.interceptor";
import {UserModule} from "./user/user.module";

@Module({
    imports: [TypeOrmModule.forRoot(), PhotoModule, UserModule],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        }
    ]
})
export class ApplicationModule {
}
