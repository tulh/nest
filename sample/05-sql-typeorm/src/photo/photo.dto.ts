export class PhotoDto {
    id: number;
    filename: string;
    name: string;
    description: string;
    views: number;
    isPublished: boolean;
    userId: number;

    constructor(photo: any) {
        this.id = photo.id;
        this.name = photo.name;
        this.description = photo.description;
        this.views = photo.views;
        this.isPublished = photo.isPublished;
    }
}