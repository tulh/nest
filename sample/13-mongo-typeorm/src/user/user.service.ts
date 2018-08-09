import {Injectable} from "@nestjs/common";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDTO} from "./user.dto";
import {Profile} from "../profile/profile.entity";
import {Photo} from "../photo/photo.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async save(userDTO: UserDTO): Promise<User> {
        const user = new User();
        user.firstname = userDTO.firstname;
        user.lastname = userDTO.lastname;
        user.profile = new Profile(userDTO.profile.about, userDTO.profile.education, userDTO.profile.career);
        const photos: Photo[] = [];
        userDTO.photos.forEach(photoDTO => photos.push(new Photo(photoDTO.name, photoDTO.description, photoDTO.filename, photoDTO.isPublished)));
        user.photos = photos;
        return await this.userRepository.save(user);
    }
}