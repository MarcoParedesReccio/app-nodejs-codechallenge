import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { Transaction } from '../../domain/entities/transaction.entity';
import { ITransactionRepository } from '../../domain/repositories/i.transaction.repository';
import { TransactionStatusEnum } from '@transaction-system/shared';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction) private readonly repository: Repository<Transaction>
  ) {}

  async save(transaction: Transaction): Promise<Transaction> {
    return await this.repository.save(transaction);
  }

  async findById(id: string): Promise<Transaction | null> {
    return await this.repository.findOneBy({ _id: new ObjectId(id) });
  }

  async updateStatus(id: string, status: TransactionStatusEnum): Promise<void> {
    await this.repository.update(id, { status});
  }

}
