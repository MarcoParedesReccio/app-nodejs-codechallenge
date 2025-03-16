import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTransactionStatusCommand } from '../update-transaction-status.command';
import { ITransactionRepository } from '../../../domain/repositories/i.transaction.repository';

@CommandHandler(UpdateTransactionStatusCommand)
export class UpdateTransactionStatusHandler implements ICommandHandler<UpdateTransactionStatusCommand, void> {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(command: UpdateTransactionStatusCommand): Promise<void> {
    await this.transactionRepository.updateStatus(command.transactionExternalId, command.status);
  }

}
