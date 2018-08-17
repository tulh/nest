import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import {User} from './user.entity';
import {ApiModelProperty} from '@nestjs/swagger';

export enum RoleName {
    ADMIN = 'ADMIN',
    USER = 'USER',
    OPS = 'OPS',
}

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;
    @CreateDateColumn({type: 'datetime'})
    @ApiModelProperty()
    createTime: Date;
    @UpdateDateColumn({type: 'datetime'})
    @ApiModelProperty()
    updatedDate: Date;
    @VersionColumn()
    version: number;
    @Column({type: 'enum', enum: RoleName, nullable: false, unique: true})
    @ApiModelProperty({enum: ['ADMIN', 'USER', 'OPS']})
    name: RoleName;
    @Column({type: 'tinyint', nullable: false, default: 1})
    active: number;
    @ManyToMany(type => User, user => user.roles)
    users: Promise<User[]>;
}
