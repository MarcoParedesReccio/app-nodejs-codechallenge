import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TypeOrmConfigModule } from './typeorm-config.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Transaction]),
  ],
  providers: [
    {
      provide: 'ITransactionRepository',
      useClass: TransactionRepository,
    },
    TransactionRepository
  ],
  exports: ['ITransactionRepository'],
})
export class TypeOrmDatabaseModule {}
