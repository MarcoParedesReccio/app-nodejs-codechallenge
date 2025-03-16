import { ICommand } from '@nestjs/cqrs';
import { TransactionStatusEnum } from "@transaction-system/shared";

export class UpdateTransactionStatusCommand implements ICommand {

  constructor(
    public readonly transactionExternalId: string,
    public readonly status: TransactionStatusEnum,
  ) {}
  
}
