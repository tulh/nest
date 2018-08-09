import {User} from "./user.entity";
import {EntityManager, EntityRepository, Repository} from "typeorm";
import {InjectEntityManager} from "@nestjs/typeorm";
import {PhotoDto} from "../photo/photo.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {
        super();
    }

    findByNameAndPassword(name, password) {
        return this.findOne({name: name, password: password});
    }

    addPhotoToUser(photoDTO: PhotoDto) {
        this.entityManager.createQueryBuilder()
            .relation(User, "photos")
            .of(photoDTO.userId)
            .add({
                id: photoDTO.id,
                name: photoDTO.name,
                filename: photoDTO.filename,
                description: photoDTO.description,
                isPublished: photoDTO.isPublished,
                views: photoDTO.views
            });

    }
}