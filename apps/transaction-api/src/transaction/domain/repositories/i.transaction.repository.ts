import { Transaction } from '../entities/transaction.entity';
import { TransactionStatusEnum } from '@transaction-system/shared';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  updateStatus(id: string, status: TransactionStatusEnum): Promise<void>;
}
