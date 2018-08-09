import {Body, Controller, Get, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDTO} from "./user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    create(@Body()userDTO: UserDTO) {
        return this.userService.save(userDTO);
    }

}