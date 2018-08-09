import {Injectable} from '@nestjs/common';
import {InjectRepository, InjectConnection, InjectEntityManager} from '@nestjs/typeorm';
import {Connection, EntityManager, Repository} from 'typeorm';
import {Photo} from './photo.entity';
import {log} from "util";

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
        @InjectConnection()
        private readonly connection: Connection,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {
    }

    async findAll(): Promise<Photo[]> {
        return await this.photoRepository.find();
    }

    async findByCustomQuery(query): Promise<Photo[]> {
        // return await this.entityManager.createQueryBuilder()
        //     .select("photo")
        //     .from(Photo, "photo")
        //     .where("photo.filename = :filename", {filename: query.filename})
        //     .getMany();

        // return await this.photoRepository.createQueryBuilder("photo")
        //     .where("photo.views = :views", {views: query.views})
        //     .getMany();

        return await this.connection.createQueryBuilder()
            .select("photo")
            .from(Photo, "photo")
            .where("photo.isPublished = :public", {public: Boolean(query.public)})
            .getMany();
    }

    async deleteById(id) {
        return await this.photoRepository.createQueryBuilder("photo")
            .delete()
            .where("photo.id = :id", {id: id})
            .execute();
    }

    async save(photo): Promise<Photo> {
        // return await this.photoRepository.save(photo);
        // return await this.entityManager.create(Photo, photo);
        return await this.connection.createQueryBuilder()
            .insert()
            .into(Photo)
            .values({
                filename: photo.filename,
                views: photo.views,
                isPublished: photo.isPublished,
                name: photo.name,
                description: photo.description
            })
            .execute();
    }

    async countAllViews(filename): Promise<number> {
        return await this.entityManager.createQueryBuilder()
            .select("SUM(photo.views)", "sum")
            .from(Photo, "photo")
            .where("photo.filename = :filename", {filename: filename})
            .getRawOne();
    }

    async update(photo: Photo): Promise<void> {
        try {
            // let photoToUpdate = this.photoRepository.findOne(photo.id);
            // photoToUpdate.name= photo.name;
            return await this.photoRepository.updateById({id: photo.id}, {
                name: photo.name,
                filename: photo.filename,
                description: photo.description,
                isPublished: photo.isPublished,
                user: photo.user
            });
        } catch (e) {
            log("Exception: " + e.details);
            return null;
        }
    }
}
