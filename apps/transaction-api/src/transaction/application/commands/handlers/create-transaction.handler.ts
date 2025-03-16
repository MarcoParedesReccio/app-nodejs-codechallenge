import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateTransactionCommand } from '../create-transaction.command';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { TransactionStatusEnum } from "@transaction-system/shared";
import { ClientKafka } from '@nestjs/microservices';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionDto } from '../../dtos/transaction.dto';
import { ITransactionRepository } from '../../../domain/repositories/i.transaction.repository';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler implements ICommandHandler<CreateTransactionCommand, TransactionDto> {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @InjectMapper() private readonly mapper: Mapper,
    @Inject('TRANSACTION_EVENT') private readonly kafkaClient: ClientKafka
  ) {}

  async execute(command: CreateTransactionCommand): Promise<TransactionDto> {
    const transaction = this.mapper.map(command, CreateTransactionCommand, Transaction);
    transaction.status = TransactionStatusEnum.PENDING;
    const savedTransaction = await this.transactionRepository.save(transaction);
    const response = this.mapper.map(savedTransaction, Transaction, TransactionDto);
    this.kafkaClient.emit('transaction_created', JSON.stringify(response));
    return response;
  }

}
