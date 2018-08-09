import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors} from '@nestjs/common';
import {PhotoService} from './photo.service';
import {Photo} from './photo.entity';
import {LoggingInterceptor} from "../logging.interceptor";

@Controller('photo')
// @UseInterceptors(LoggingInterceptor)
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {
    }

    @Get()
    findAll(): Promise<Photo[]> {
        return this.photoService.findAll();
    }

    @Get('find')
    findByCustomQuery(@Query() query) {
        return this.photoService.findByCustomQuery(query);
    }

    @Delete(':id')
    delete(@Param('id') id) {
        this.photoService.deleteById(id);
    }

    @Post()
    create(@Body()photo: Photo) {
        return this.photoService.save(photo);
    }

    @Get('countViews')
    countViewsByFileName(@Query() query) {
        return this.photoService.countAllViews(query.filename);
    }

    @Put()
    update(@Body()photo: Photo) {
        return this.photoService.update(photo);
    }
}
