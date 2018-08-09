import {Injectable} from "@nestjs/common";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Photo} from "../photo/photo.entity";
import {UserRepository} from "./user.repository";
import {getCustomRepository, getManager, Repository, Transaction, TransactionRepository} from "typeorm";
import {UserDto} from "./user.dto";
import {log} from "util";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    private readonly customUserRepository = getCustomRepository(UserRepository);

    // @Transaction()
    async save(user: User/*, @TransactionRepository(User) userRepository: Repository<User>*/): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id): Promise<User> {
        const user = await this.userRepository.findOne(id);
        // let userDto = new UserDto(user);
        // let photoDtos: PhotoDto[] = [];
        // user.photos.then(photo => photoDtos.push(new PhotoDto(photo)));
        // user.photos
        //     .forEach(photo =>
        //         photoDtos.concat(new PhotoDto(photo)));
        // userDto.photos = photoDtos;
        // return userDto;
        await user.photos;
        return user;
    }

    async getListPhoto(id): Promise<Photo[]> {
        const user = await this.userRepository.findOne(id);
        const photos = await user.photos;
        return photos;
    }

    async findByUserNameAndPassword(name, password): Promise<User> {
        const user = await this.customUserRepository.findByNameAndPassword(name, password);
        if (user !== null) {
            await user.photos;
        }
        return user;
    }

    async addPhotoToUser(photoDTO) {
        await this.customUserRepository.addPhotoToUser(photoDTO);
    }

    async saveUserWithPhoto(userDTO: UserDto) {
        try {
            await getManager().transaction(async transactionalEntityManager => {
                let user = new User();
                user.name = userDTO.name;
                user.password = userDTO.password;
                await transactionalEntityManager.save(user);
                const photoDTOs = userDTO.photos;
                let photos: Photo[] = [];
                photoDTOs.forEach(photoDTO => {
                    let photo = new Photo();
                    photo.name = photoDTO.name;
                    photo.filename = photoDTO.filename;
                    photo.views = photoDTO.views;
                    photo.isPublished = photoDTO.isPublished;
                    photo.description = photoDTO.description;
                    photos.push(photo);
                });
                if (photos.length > 0) {
                    await transactionalEntityManager.save(photos);
                }
            });
        } catch (e) {
            log(`${e.code} ${e.sqlMessage}`);
        }

    }

}