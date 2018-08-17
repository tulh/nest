import {Controller, Get, Param, Post, Body} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './create-user.dto';
import {User} from './user.entity';
import {ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import any = jasmine.any;

@Controller('user')
@ApiUseTags('user')
@ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
})
@ApiResponse({status: 403, description: 'Forbidden.'})
@ApiResponse({status: 500, description: 'Internal server error.'})
@ApiResponse({status: 400, description: 'Bad request'})
@ApiBearerAuth()
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Get()
    @ApiOperation({title: 'find all user'})
    findAll() {
        return this.userService.customQuery();
    }

    @Get(':id')
    @ApiOperation({title: 'find user by id'})
    findOne(@Param('id')id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    @ApiOperation({title: 'Create user'})
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
}