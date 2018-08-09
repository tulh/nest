import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import {Photo} from "../photo/photo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 20})
    name: string;

    @Column({select: false})
    password: string;

    @OneToMany(type => Photo, photo => photo.user, {eager: false, cascadeInsert: true, cascadeUpdate: true})
    photos: Promise<Photo[]>;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;
}