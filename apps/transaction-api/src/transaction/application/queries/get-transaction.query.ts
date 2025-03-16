import { IQuery } from '@nestjs/cqrs';

export class GetTransactionQuery implements IQuery {
  constructor(public readonly transactionExternalId: string) {}
}
