import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PhotoModule} from './photo/photo.module';
import {UserModule} from "./user/user.module";
import {ProfileModule} from "./profile/profile.module";

@Module({
    imports: [TypeOrmModule.forRoot(), PhotoModule, ProfileModule, UserModule],
})
export class ApplicationModule {
}
