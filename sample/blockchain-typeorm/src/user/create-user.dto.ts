import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
    @ApiModelProperty()
    @IsString()
    readonly email: string;
    @ApiModelProperty()
    @IsString()
    readonly password: string;
}