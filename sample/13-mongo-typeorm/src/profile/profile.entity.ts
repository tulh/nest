import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class Profile {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    about: string;

    @Column()
    education: string;

    @Column()
    career: string;

    constructor(about: string, education: string, career: string) {
        this.about = about;
        this.education = education;
        this.career = career;
    }

}