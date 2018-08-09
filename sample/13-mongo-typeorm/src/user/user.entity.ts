import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {Profile} from "../profile/profile.entity";
import {Photo} from "../photo/photo.entity";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column(type => Profile)
    profile: Profile;

    @Column(type => Photo)
    photos: Photo[];
}