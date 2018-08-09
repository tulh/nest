import {PhotoDto} from "../photo/photo.dto";
import {User} from "./user.entity";

export class UserDto {
    id: number;
    name: string;
    password: string;
    createdDate: Date;
    updatedDate: Date;
    version: number;
    photos: PhotoDto[];

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.createdDate = user.createdDate;
        this.updatedDate = user.updatedDate;
        this.version = user.version;
        // user.photos
        //     .then((photoArray: PhotoDto[]) => {
        //         for (let photo in photoArray) {
        //             this.photos.concat(new PhotoDto(photo));
        //         }
        //     })
        // for (let photo in user.photos) {
        //     this.photos.push(new PhotoDto(photo));
        // }
    }
}