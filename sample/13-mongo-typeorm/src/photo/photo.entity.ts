import {Entity, Column, ObjectIdColumn, ObjectID} from 'typeorm';

@Entity()
export class Photo {
    @ObjectIdColumn() id: ObjectID;

    @Column() name: string;

    @Column() description: string;

    @Column() filename: string;

    @Column() isPublished: boolean;

    constructor(name: string, description: string, filename: string, isPublished: boolean) {
        this.name = name;
        this.description = description;
        this.filename = filename;
        this.isPublished = isPublished;
    }
}
