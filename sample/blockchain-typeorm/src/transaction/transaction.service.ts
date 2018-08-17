import {Injectable} from '@nestjs/common';
import {Transaction} from './transaction.entity';
import {EntityManager, Repository} from 'typeorm';
import {InjectRepository, InjectEntityManager} from '@nestjs/typeorm';
import {log} from 'util';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {
    }

    async findAll(): Promise<Transaction[]> {
        log('Nothing new there');
        log('this is logger provided by nest');
        return await this.transactionRepository.find();
    }
}