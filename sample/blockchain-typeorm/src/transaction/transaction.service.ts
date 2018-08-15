import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';

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
    return await this.transactionRepository.find();
  }
}