import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Photo} from './photo.entity';
import {PhotoDTO} from "../user/user.dto";
import {log} from "util";

@Injectable()
export class PhotoService implements OnModuleInit, OnModuleDestroy{
    onModuleDestroy(): any {
        log('Cleanup....');
    }

    onModuleInit(): any {
        log('Initialization ...');
    }

    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
    ) {
    }

    async findAll(): Promise<Photo[]> {
        return await this.photoRepository.find();
    }

    async create(photoDTO: PhotoDTO): Promise<Photo> {
        const photo = new Photo(photoDTO.name, photoDTO.description, photoDTO.filename,photoDTO.isPublished);
        return await this.photoRepository.save(photo);
    }

}
