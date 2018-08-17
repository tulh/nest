import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import {Role} from './role.entity';
import {ApiModelProperty} from "@nestjs/swagger";

@Entity()
export class User {
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
    @Column({nullable: false, unique: true})
    email: string;
    @Column({select: false, nullable: false})
    password: string;
    @Column({nullable: true})
    fname: string;
    @Column({nullable: false, default: 0})
    tokenBalance: number;
    @Column({type: 'tinyint', nullable: false, default: 0})
    tfaSign: number;
    @Column({nullable: true})
    tfaSecret: string;
    @Column({nullable: false, default: 0})
    emailConfirmedFlag: number;
    @Column({nullable: true, default: null})
    lastLogonTime: Date;
    @Column({default: null})
    phoneNumber: string;
    @Column({default: null})
    referenceUserId: number;
    @Column({default: null})
    activationCode: string;
    @Column({default: null})
    passwordResetToken: string;
    @Column({default: null})
    refreshAccessToken: string;
    @Column({default: null})
    salt: string;
    @ManyToMany(type => Role, role => role.users/*, {eager: false}*/)
    @JoinTable()
    roles: Promise<Role[]>;
}