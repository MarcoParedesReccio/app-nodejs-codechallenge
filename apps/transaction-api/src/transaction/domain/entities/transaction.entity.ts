import { AutoMap } from '@automapper/classes';
import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { TransactionStatusEnum } from '@transaction-system/shared';

@Entity()
export class Transaction {
  @AutoMap()
  @ObjectIdColumn()
  _id: ObjectId;

  @AutoMap()
  @Column()
  accountExternalIdDebit: string;

  @AutoMap()
  @Column()
  accountExternalIdCredit: string;

  @AutoMap()
  @Column()
  transferTypeId: number;

  @AutoMap()
  @Column()
  value: number;

  @AutoMap()
  @Column({ default: TransactionStatusEnum.PENDING })
  status: TransactionStatusEnum;

  @AutoMap()
  @Column()
  createdAt: Date = new Date();
}
