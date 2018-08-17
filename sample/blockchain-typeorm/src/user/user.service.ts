import {Injectable, InternalServerErrorException, ServiceUnavailableException} from '@nestjs/common';
import {User} from './user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateUserDto} from './create-user.dto';
import {log} from "util";

@Injectable()
export class UserService {
    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = new User();
            user.email = createUserDto.email;
            user.password = createUserDto.password;
            return await this.userRepository.save(user);
        } catch (e) {
            log(e.sqlMessage)
            throw new InternalServerErrorException(e.code);
        }
    }

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        users.forEach(user => user.roles);
        return users;
    }

    async findOne(id): Promise<User> {
        const user = await this.userRepository.findOne(id);
        await user.roles;
        return user;
    }

    async customQuery(): Promise<User[]> {
        // return await this.userRepository.find({ join: { alias: 'user', leftJoinAndSelect: { roles: 'user.roles' } } });
        return await this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.roles', 'role').getMany();
    }
}