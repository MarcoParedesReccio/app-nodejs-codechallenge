import { AutoMap } from '@automapper/classes';
import { ICommand } from '@nestjs/cqrs';

export class CreateTransactionCommand implements ICommand {
  @AutoMap()
  public readonly accountExternalIdDebit: string;

  @AutoMap()
  public readonly accountExternalIdCredit: string;

  @AutoMap()
  public readonly transferTypeId: number;

  @AutoMap()
  public readonly value: number;

  constructor(accountExternalIdDebit: string, accountExternalIdCredit: string, transferTypeId: number, value: number) {
    this.accountExternalIdDebit = accountExternalIdDebit;
    this.accountExternalIdCredit = accountExternalIdCredit;
    this.transferTypeId = transferTypeId;
    this.value = value;
  }
  
}
