import {Body, Controller, Get, Post, Render, Res} from '@nestjs/common';
import {PhotoService} from './photo.service';
import {Photo} from './photo.entity';
import {PhotoDTO} from "../user/user.dto";

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {
    }

    @Get()
    findAll(): Promise<Photo[]> {
        return this.photoService.findAll();
    }

    @Post()
    create(@Body()photoDTO: PhotoDTO): Promise<Photo> {
        return this.photoService.create(photoDTO);
    }

    @Get('index')
    index(@Res() res) {
        res.setHeader('Content-Type','image/jpg')
        res.sendFile('test.jpg', {root: __dirname + './../../public'});
    }
}
