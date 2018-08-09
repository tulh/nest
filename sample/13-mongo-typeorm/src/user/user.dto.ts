export class ProfileDTO {
    about: string;
    education: string;
    career: string;
}

export class PhotoDTO {
    name: string;
    description: string;
    filename: string;
    isPublished: boolean;
}

export class UserDTO {
    firstname: string;
    lastname: string;
    profile: ProfileDTO;
    photos: PhotoDTO[];
}