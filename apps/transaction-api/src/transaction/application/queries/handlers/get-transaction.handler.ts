import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectMapper } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { GetTransactionQuery } from '../get-transaction.query';
import { ITransactionRepository } from '../../../domain/repositories/i.transaction.repository';
import { TransactionDto } from '../../dtos/transaction.dto';
import { Transaction } from '../../../domain/entities/transaction.entity';

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler implements IQueryHandler<GetTransactionQuery> {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  async execute(query: GetTransactionQuery): Promise<TransactionDto | null> {
    const transaction = await this.transactionRepository.findById(query.transactionExternalId);
    return this.mapper.map(transaction, Transaction, TransactionDto);
  }
}
