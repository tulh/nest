import {Body, Controller, ForbiddenException, Get, Post, Render, Req, Res, UseFilters} from '@nestjs/common';
import {PhotoService} from './photo.service';
import {Photo} from './photo.entity';
import {PhotoDTO} from "../user/user.dto";
import {HttpExceptionFilter, LogService} from "npm.tiep.demo";

@Controller('photo')
// @UseFilters(new HttpExceptionFilter())
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {
    }

    @Get()
    findAll(): Promise<Photo[]> {
        // throw new ForbiddenException();
        return this.photoService.findAll();
    }

    @Post()
    create(@Body()photoDTO: PhotoDTO): Promise<Photo> {
        return this.photoService.create(photoDTO);
    }

    @Get('index')
    index(@Req() req, @Res() res) {
        const logService: LogService = new LogService('PhotoController');
        logService.info(req.toString());
        res.setHeader('Content-Type','image/jpg')
        res.sendFile('test.jpg', {root: __dirname + './../../public'});
    }
}
