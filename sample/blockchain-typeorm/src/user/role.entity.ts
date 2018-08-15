import {
  Column,
  CreateDateColumn,
  Entity, JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum RoleName {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OPS = 'OPS',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ type: 'datetime' })
  createTime: Date;
  @UpdateDateColumn({ type: 'datetime' })
  updatedDate: Date;
  @VersionColumn()
  version: number;
  @Column({ type: 'enum', enum: RoleName, nullable: false, unique: true })
  name: RoleName;
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  active: number;
  @ManyToMany(type => User, user => user.roles)
  users: Promise<User[]>;
}
