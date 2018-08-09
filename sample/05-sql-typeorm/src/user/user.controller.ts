import {Body, Controller, Param, Post, Query, Res} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {Get} from "@nestjs/common/utils/decorators/request-mapping.decorator";
import {PhotoDto} from "../photo/photo.dto";
import {UserDto} from "./user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService) {
    }

    @Post()
    save(@Body()user: User) {
        return this.userService.save(user);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    // @Get(':id')
    // findById(@Query('id') id) {
    //     // const user =  this.userService.findById(id);
    //     // const userDTO = plainToClass(UserDto, user);
    //     // return user;
    //     return this.userService.getListPhoto(id);
    // }

    @Get('find')
    findByNameAndPassword(@Query() params) {
        return this.userService.findByUserNameAndPassword(params.name, params.password);
    }

    @Post('updatePhoto')
    async updatePhoto(@Body() photoDTO: PhotoDto) {
        this.userService.addPhotoToUser(photoDTO);
    }

    @Post('createUserWithPhoto')
    async createUserWithPhoto(@Body() userDTO: UserDto) {
        return this.userService.saveUserWithPhoto(userDTO);
    }

}