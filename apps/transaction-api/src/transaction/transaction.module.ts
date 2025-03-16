import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateTransactionHandler } from './application/commands/handlers/create-transaction.handler';
import { UpdateTransactionStatusHandler } from './application/commands/handlers/update-transaction-status.handler';
import { MappingModule } from './application/mappings/mapping.module';
import { GetTransactionHandler } from './application/queries/handlers/get-transaction.handler';
import { TypeOrmDatabaseModule } from './infrastructure/database/typeorm.module';
import { TransactionController } from './presentation/controllers/transaction.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmDatabaseModule,
    CqrsModule,
    MappingModule,
    ClientsModule.register([
      {
        name: 'TRANSACTION_EVENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: 'transaction-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [
    GetTransactionHandler,
    CreateTransactionHandler,
    UpdateTransactionStatusHandler
  ]
})
export class TransactionModule {}
