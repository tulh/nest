import {Body, Controller, Get, Param, Post, UseInterceptors} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDTO} from "./user.dto";
import {TransformInterceptor} from "../transform.interceptor";
import {ExcludeNullInterceptor} from "../excludenull.interceptor";
import {ErrorInterceptor} from "../error.interceptor";

@Controller('user')
@UseInterceptors(ExcludeNullInterceptor, TransformInterceptor, ErrorInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param('id')id) {
        throw new Error('Empty service return');
    }

    @Post()
    create(@Body()userDTO: UserDTO) {
        return this.userService.save(userDTO);
    }

}